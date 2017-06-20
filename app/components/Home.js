// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import styles from './Home.css';

const initialState = {
  isLoading: false,
  value: '',
  results: []
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
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e: {}, result: {}) => this.setState({ value: result.title })

  handleSearchChange = (e: {}, value: string) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.items || [], isMatch),
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <div>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={formatResults(results)}
          value={value}
        />
      </div>
    );
  }
}

const formatResults = (results: []=[]) => {
  const formattedResults = results.map(item => {
    const formattedItem = { ...item };
    delete formattedItem.quantity;
    delete formattedItem.unit;
    formattedItem.price = `$${formattedItem.price}`;
    return formattedItem;
  });
  return formattedResults;
};

