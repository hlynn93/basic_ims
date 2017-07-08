import React, { Component } from 'react';
import moment from 'moment';

import { Table, Filters } from './TransactionComponents';
import { DateHelper } from '../helpers';

const DATE_FORMAT = 'MM-YYYY';
const MONTH_FORMAT = 'MMMM';

class Transaction extends Component {
  props: {
    transactions: [],
    items: [],
    range: {},
    actions: {
      getItems: () => void,
      getTransactions: () => void
    }
  }
  state = {
    filters: {
      month: moment().format(MONTH_FORMAT),
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

  handleFilter() {
    const { filters } = this.state;
    return this.props.actions.getTransactions({
      month: moment(filters.month, MONTH_FORMAT).format('MM'),
      year: filters.year
    });
  }

  render() {
    const { transactions, items, range } = this.props;
    const { filters } = this.state;

    const parsedRange = { min: moment(range.min).format(DATE_FORMAT), max: moment(range.max).format(DATE_FORMAT) };
    const monthOptions = DateHelper.getMonthOptions(parsedRange, filters.year );

    const months = monthOptions.map((v, i) => ({ key: v, value: v, text: v }));
    const years = DateHelper.getYearOptions(parsedRange).map(v => ({ key: v, value: v, text: v }));

    return (
      <div>
        <Filters
          monthOptions={months}
          yearOptions={years}
          filters={filters}
          onChange={this.handleChange.bind(this)}
          onSubmitFilter={this.handleFilter.bind(this)}
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
