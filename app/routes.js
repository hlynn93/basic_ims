/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { App, HomePage, AddPage,
  InventoryPage, SettingsPage, TransactionPage } from './containers';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/add" component={AddPage} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/transactions" component={TransactionPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </App>
  </Router>
);
