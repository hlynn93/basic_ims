import React, { Component } from 'react';
import moment from 'moment';

import { Table, Filters } from './TransactionComponents';
import { constants as CONST } from '../utils';

class Transaction extends Component {
  props: {
    transactions: [],
    items: [],
    actions: {
      getItems: () => void,
      getTransactions: () => void
    }
  }
  state = {
    filters: {
      month: moment().get('month') + 1,
      year: moment().get('year')
    }
  }

  componentWillMount() {
    this.props.actions.getItems();
    this.props.actions.getTransactions();
  }

  handleChange(type, event, result) {
    const value = result.value ? result.value : result;
    this.setState({
      filters: { ...this.state.filters, [type]: value }
    });
  }

  render() {
    const { transactions, items } = this.props;
    const { filters } = this.state;
    console.warn(filters);
    return (
      <div>
        <Filters
          filters={filters}
          onChange={this.handleChange.bind(this)}
        />
        <Table
          transactions={transactions}
          filters={filters}
          items={items}
        />
      </div>
    );
  }
}

export default Transaction;
