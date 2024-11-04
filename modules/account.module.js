import { html, useState, useEffect, useContext } from 'htm/preact';
import { AppContext } from '../app.js';
import { AccountType } from '../app.types.js';

export const Account = () => {
  const { data } = useContext(AppContext);
  const [state, setState] = useState({});

  useEffect(() => {
    fetch('env.json').then(async (res) => {
      const json = await res.json();

      setState({ id: data.id, ...json });
    });
  }, []);

  return html` <div class="sectionHeadingOpened">Account Information</div>
    <div class="sectionContent">
      <div class="table-responsive">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          class="table table-bordered"
        >
          <tbody>
            <tr>
              <td>Name</td>
              <td>${state[AccountType.NAME]}</td>
            </tr>
            <tr>
              <td>Account</td>
              <td>${state.id}</td>
            </tr>
            <tr>
              <td>Account Type</td>
              <td>${state[AccountType.ACCOUNT_TYPE]}</td>
            </tr>
            <tr>
              <td>Customer Type</td>
              <td>${state[AccountType.CUSTOMER_TYPE]}</td>
            </tr>
            <tr>
              <td>Account Capabilities</td>
              <td>${state[AccountType.ACCOUNT_CAPABILITIES]}</td>
            </tr>
            <tr>
              <td>Base Currency</td>
              <td>${state[AccountType.BASE_CURRENCY]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
};
