// @flow
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { AddForm } from './HomeComponents';

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
      ...this.state,
      item: {},
      transactions: [...this.state.transactions, transaction]
    });
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        <AddForm
          items={this.props.items}
          item={item}
          onResultSelect={this.handleResultSelect.bind(this)}
          onSubmit={this.handleAdd.bind(this)}
        />
      </div>
    );
  }
}
