/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import { App, HomePage, ManagePage,
  InventoryPage, SettingsPage, TransactionPage } from './containers';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/manage" component={ManagePage} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/transactions" component={TransactionPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </App>
  </Router>
);
