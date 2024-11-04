import { html, useContext } from 'htm/preact';
import { AppContext } from '../app.js';
import { TradeType } from '../app.types.js';

export const FinancialInstrument = () => {
  const { displayData, labels } = useContext(AppContext);

  return html` <div class="sectionHeadingOpened">
      Financial Instrument Information
    </div>
    <div class="sectionContent">
      <div class="table-responsive">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          class="table table-bordered"
        >
          ${Object.entries(displayData).map(([key, category]) => {
            return Object.keys(category).length
              ? html`
                  <thead>
                    <tr>
                      <th align="left">Symbol</th>
                      <th align="left">Description</th>
                      <th align="left">Conid</th>
                      <th align="left">Security ID</th>
                      <th align="left">Listing Exch</th>
                      <th align="left">Multiplier</th>
                      <th align="left">Type</th>
                      <th align="left">Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        class="header-asset"
                        align="left"
                        valign="middle"
                        colspan="14"
                      >
                        ${labels[key]}
                      </td>
                    </tr>
                    ${Object.values(category)
                      .reduce(
                        (acc, currency) => [
                          ...acc,
                          ...Object.values(currency).map((item) => item.trades),
                        ],
                        []
                      )
                      .map((item) => {
                        const instrument = item[0];
                        return html`
                          <tr>
                            <td class="no-border-left">
                              ${instrument[TradeType.SYMBOL]}
                            </td>
                            <td>${instrument[TradeType.DESCRIPTION]}</td>
                            <td>${instrument[TradeType.CON_ID]}</td>
                            <td>${instrument[TradeType.SECURITY_ID]}</td>
                            <td>${instrument[TradeType.LISTING_EXCHANGE]}</td>
                            <td>${instrument[TradeType.MULTIPLIER]}</td>
                            <td>${instrument[TradeType.SUBCATEGORY]}</td>
                            <td></td>
                          </tr>
                        `;
                      })}
                  </tbody>
                `
              : null;
          })}
          <tbody>
            <tr class="border-top">
              <td class="border-top" colspan="9"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
};
