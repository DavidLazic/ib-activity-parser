import { html, render, useState, useEffect, createContext } from 'htm/preact';
import { Trades } from './modules/trades.module.js';
import { Filters } from './app.filters.js';
import { FinancialInstrument } from './modules/financial-instrument.module.js';
import { Account } from './modules/account.module.js';
import { Header } from './modules/header.module.js';
import { TradeCategoryType, TradeType } from './app.types.js';

export const AppContext = createContext();

const labels = {
  [TradeCategoryType.STOCKS]: 'Stocks',
  [TradeCategoryType.FOREX]: 'Forex',
};

const App = () => {
  const [data, setData] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredData, setFilteredData] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  const transform = (data) =>
    data.reduce(
      (acc, current) => {
        const category = acc[current[TradeType.ASSET_CATEGORY]] || {};
        const currency = category[current[TradeType.CURRENCY]] || {};
        const symbol = currency[current[TradeType.SYMBOL]] || {
          totalBought: {
            [TradeType.QUANTITY]: 0,
            [TradeType.PROCEEDS]: 0,
            [TradeType.COMMISSION]: 0,
            [TradeType.FEE]: 0,
          },
          totalSold: {
            [TradeType.QUANTITY]: 0,
            [TradeType.PROCEEDS]: 0,
            [TradeType.COMMISSION]: 0,
            [TradeType.FEE]: 0,
          },
          trades: [],
        };

        return {
          ...acc,
          [current[TradeType.ASSET_CATEGORY]]: {
            ...category,
            [current[TradeType.CURRENCY]]: {
              ...currency,
              [current[TradeType.SYMBOL]]: {
                totalBought: Object.entries(symbol.totalBought).reduce(
                  (acc, [key, value]) => {
                    return {
                      ...acc,
                      [key]:
                        value +
                        (current[TradeType.BUY_SELL] === 'BUY'
                          ? Number(current[key])
                          : 0),
                    };
                  },
                  {}
                ),
                totalSold: Object.entries(symbol.totalSold).reduce(
                  (acc, [key, value]) => {
                    return {
                      ...acc,
                      [key]:
                        value +
                        (current[TradeType.BUY_SELL] === 'SELL'
                          ? Number(current[key])
                          : 0),
                    };
                  },
                  {}
                ),
                trades: [...symbol.trades, current],
              },
            },
          },
        };
      },
      {
        [TradeCategoryType.STOCKS]: {},
        [TradeCategoryType.FOREX]: {},
      }
    );

  const onFilePick = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = ({ target }) => parse(target.result);
  };

  const onFilterApply = (filters) => {
    const updated = data.trades.filter((item) =>
      Object.entries(filters)
        .map(([key, value]) => (value ? item[key] === value : true))
        .every(Boolean)
    );

    setActiveFilters(filters);
    setFilteredData(updated);
    setDisplayData(transform(updated));
  };

  const parse = (data) => {
    const parser = new DOMParser();
    const parsed = getDataFromXML(
      parser.parseFromString(data, 'application/xml').documentElement
    );

    setData(parsed);
    setDisplayData(transform(parsed.trades));
  };

  const getDataFromXML = (doc) => {
    const id = doc
      .querySelector('FlexStatement')
      .attributes.getNamedItem('accountId').value;

    const trades = Array.from(doc.querySelectorAll('TradeConfirm'))
      .map((confirm) => {
        const attrs = Array.from(confirm.attributes);
        return attrs.reduce((acc, attr) => {
          acc[attr.nodeName] = attr.nodeValue;
          return acc;
        }, {});
      })
      .filter(
        (confirm) =>
          confirm[TradeType.ASSET_CATEGORY] === TradeCategoryType.STOCKS
      );

    return { id, trades };
  };

  return html`<${AppContext.Provider}
    value=${{
      data,
      displayData,
      filteredData,
      activeFilters,
      labels,
      onFilterApply,
    }}
  >
    <input class="no-print" type="file" onChange=${onFilePick} />
    <${Filters} />
    ${displayData && Report()}
  <//>`;
};

const Report = () => html`
  <section class="statement">
    <div class="container" style=${{ maxWidth: 'none' }}>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <${Header} />
          <${Account} />
          <${Trades} />
          <${FinancialInstrument} />
        </div>
      </div>
    </div>
  </section>
`;

render(html`<${App} />`, document.getElementById('app'));
