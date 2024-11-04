import { html, useContext } from 'htm/preact';
import { AppContext } from '../app.js';
import { TradeType } from '../app.types.js';
import { formatFraction } from '../app.utils.js';

export const Trades = () => {
  const { displayData, labels } = useContext(AppContext);

  return html` <div class="sectionHeadingOpened">Trades</div>
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
                      <th align="left">Acct ID</th>
                      <th align="left" colspan="2">Symbol</th>
                      <th align="left">Trade Date/Time</th>
                      <th align="left">Settle Date</th>
                      <th align="left">Exchange</th>
                      <th align="left">Type</th>
                      <th align="right">Quantity</th>
                      <th align="right">Price</th>
                      <th align="right">Proceeds</th>
                      <th align="right">Comm</th>
                      <th align="right">Fee</th>
                      <th align="right">Order Type</th>
                      <th align="right">Code</th>
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
                  </tbody>
                  ${Object.entries(category).map(([key, currency]) => {
                    return html`
                      <tbody>
                        <tr>
                          <td
                            class="header-currency"
                            align="left"
                            valign="middle"
                            colspan="14"
                          >
                            ${key}
                          </td>
                        </tr>
                      </tbody>
                      ${Object.entries(currency).map(([key, symbol]) => {
                        return html`
                          ${symbol.trades.map((trade) => {
                            return html`
                              <tbody
                                class="row-detail"
                                style=${{ display: 'table-row-group' }}
                              >
                                <tr>
                                  <td class="indent">
                                    ${trade[TradeType.ACCOUNT_ID]}
                                  </td>
                                  <td colspan="2">
                                    ${trade[TradeType.SYMBOL]}
                                  </td>
                                  <td>
                                    ${trade[TradeType.DATE_TIME].replace(
                                      ';',
                                      ', '
                                    )}
                                  </td>
                                  <td>${trade[TradeType.SETTLE_DATE]}</td>
                                  <td>${trade[TradeType.EXCHANGE]}</td>
                                  <td>${trade[TradeType.BUY_SELL]}</td>
                                  <td align="right">
                                    ${trade[TradeType.QUANTITY]}
                                  </td>
                                  <td align="right">
                                    ${trade[TradeType.PRICE]}
                                  </td>
                                  <td align="right">
                                    ${formatFraction(trade[TradeType.PROCEEDS])}
                                  </td>
                                  <td align="right">
                                    ${formatFraction(
                                      trade[TradeType.COMMISSION]
                                    )}
                                  </td>
                                  <td align="right">0.00</td>
                                  <td align="right">
                                    ${trade[TradeType.ORDER_TYPE]}
                                  </td>
                                  <td align="right">
                                    ${trade[TradeType.CODE]}
                                  </td>
                                </tr>
                              </tbody>
                            `;
                          })}
                          ${symbol.totalBought[TradeType.QUANTITY] > 0 &&
                          html`
                            <tbody>
                              <tr class="subtotal">
                                <td class="indent" colspan="7">
                                  Total ${key} (Bought)
                                </td>
                                <td align="right">
                                  ${formatFraction(
                                    symbol.totalBought[TradeType.QUANTITY],
                                    { min: 0 }
                                  )}
                                </td>
                                <td align="right"></td>
                                <td align="right">
                                  ${formatFraction(
                                    symbol.totalBought[TradeType.PROCEEDS]
                                  )}
                                </td>
                                <td align="right">
                                  ${formatFraction(
                                    symbol.totalBought[TradeType.COMMISSION]
                                  )}
                                </td>
                                <td align="right">
                                  ${formatFraction(
                                    symbol.totalBought[TradeType.FEE]
                                  )}
                                </td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          `}
                          ${Math.abs(symbol.totalSold[TradeType.QUANTITY]) >
                            0 &&
                          html` <tbody>
                            <tr class="subtotal">
                              <td class="indent" colspan="7">
                                Total ${key} (Sold)
                              </td>
                              <td align="right">
                                ${formatFraction(
                                  Math.abs(
                                    symbol.totalSold[TradeType.QUANTITY]
                                  ),
                                  { min: 0 }
                                )}
                              </td>
                              <td align="right"></td>
                              <td align="right">
                                ${formatFraction(
                                  symbol.totalSold[TradeType.PROCEEDS]
                                )}
                              </td>
                              <td align="right">
                                ${formatFraction(
                                  symbol.totalSold[TradeType.COMMISSION]
                                )}
                              </td>
                              <td align="right">
                                ${formatFraction(
                                  symbol.totalSold[TradeType.FEE]
                                )}
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>`}
                        `;
                      })}
                      <tbody>
                        <tr class="total">
                          <td class="indent" colspan="9">Total</td>
                          <td align="right">
                            ${Object.values(currency).reduce(
                              (acc, current) =>
                                formatFraction(
                                  current.totalBought[TradeType.PROCEEDS] +
                                    current.totalSold[TradeType.PROCEEDS]
                                ),
                              0
                            )}
                          </td>
                          <td align="right">
                            ${Object.values(currency).reduce(
                              (acc, current) =>
                                formatFraction(
                                  current.totalBought[TradeType.COMMISSION] +
                                    current.totalSold[TradeType.COMMISSION]
                                ),
                              0
                            )}
                          </td>
                          <td align="right">
                            ${Object.values(currency).reduce(
                              (acc, current) =>
                                formatFraction(
                                  current.totalBought[TradeType.FEE] +
                                    current.totalSold[TradeType.FEE]
                                ),
                              0
                            )}
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    `;
                  })}
                `
              : null;
          })}
        </table>
      </div>
    </div>`;
};
