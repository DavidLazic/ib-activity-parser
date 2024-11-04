import { html, useContext } from 'htm/preact';
import { AppContext } from '../app.js';
import { formatDate } from '../app.utils.js';
import { TradeType } from '../app.types.js';

export const Header = () => {
  const { activeFilters } = useContext(AppContext);

  return html`<div class="row">
      <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">
        <p class="logo-img"><span class="brand-logo"></span></p>
      </div>
      <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5">
        <p class="text-title">
          Trade Confirmation Report<br /><span
            >${formatDate(activeFilters[TradeType.TRADE_DATE])}</span
          >
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <p class="text-address">
          Interactive Brokers LLC, Two Pickwick Plaza, Greenwich, CT 06830
        </p>
        <p class="text-center"></p>
      </div>
    </div>
    <div class="row">
      <div class="col-8 col-sm-6 col-md-6 col-lg-6"></div>
      <div class="col-4 col-sm-6 col-md-6 col-lg-6">
        <p class="text-print no-print">
          <a href="javascript:window.print()"
            >Print
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width=""
              height=""
              fill="currentColor"
              class="bi bi-printer"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              <path
                d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"
              /></svg
          ></a>
        </p>
      </div>
    </div>`;
};
