import { html, useContext, useState } from 'htm/preact';
import { AppContext } from './app.js';
import { TradeType } from './app.types.js';
import { formatDate } from './app.utils.js';

const FilterLabels = {
  [TradeType.CURRENCY]: 'Currency',
  [TradeType.SYMBOL]: 'Symbol',
  [TradeType.TRADE_DATE]: 'Trade Date',
};

const FilterOptions = [
  { key: TradeType.CURRENCY, format: (value) => value },
  { key: TradeType.SYMBOL, format: (value) => value },
  {
    key: TradeType.TRADE_DATE,
    format: formatDate,
  },
];

export const Filters = () => {
  const { data, filteredData, activeFilters, onFilterApply } =
    useContext(AppContext);

  const onFilterChange = (key) => (e) => {
    const filters = { ...activeFilters, [key]: e.target.value || null };
    onFilterApply(filters);
  };

  return html` <div class="no-print" style=${{ display: 'flex' }}>
    ${data &&
    FilterOptions.map(
      ({ key, format }) => html`
        <label class="dropdown-header">
          <div>${FilterLabels[key]}</div>
          <select onChange=${onFilterChange(key)}>
            <option value=${null} selected=${activeFilters[key] === null}>
              --
            </option>
            ${[
              ...new Set(
                (filteredData || data.trades).map((trade) => trade[key])
              ),
            ]
              .sort((a, b) => new Date(b) - new Date(a))
              .map(
                (filterOption) => html`<option
                  value=${filterOption}
                  selected=${activeFilters[key] === filterOption}
                >
                  ${format(filterOption)}
                </option>`
              )}
          </select>
        </label>
      `
    )}
  </div>`;
};
