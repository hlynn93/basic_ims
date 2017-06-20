// @flow
import React, { Component } from 'react';

import { AddForm, TransactionTable } from './HomeComponents';

const initialState = {
  item: {},
  transactions: [],
};

export default class Home extends Component {
  props: {
    items: [],
    actions: {
      getItems: () => void
    }
  }

  state = { ...initialState }

  componentWillMount() {
    this.props.actions.getItems();
  }

  resetItem() {
    return this.setState({ item: {} });
  }

  handleResultSelect(id: number) {
    const { items } = this.props;
    this.setState({ ...this.state, item: items.find(item => item.id === id) });
  }

  handleAdd(transaction: {}={}) {
    this.setState({
      item: {},
      transactions: [...this.state.transactions, transaction]
    });
  }

  handleDelete(index: number) {
    const newTransactions = [...this.state.transactions];
    newTransactions.splice(index, 1);
    this.setState({
      transactions: newTransactions,
    })
  }

  handeOrder() {

  }

  render() {
    const { item, transactions } = this.state;
    return (
      <div>
        <AddForm
          items={this.props.items}
          item={item}
          onResultSelect={this.handleResultSelect.bind(this)}
          onSubmit={this.handleAdd.bind(this)}
        />
        <TransactionTable
          transactions={transactions}
          onDelete={this.handleDelete.bind(this)}
          onOrder={this.handeOrder.bind(this)}
        />
      </div>
    );
  }
}
