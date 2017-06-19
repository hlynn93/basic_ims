// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

import styles from './Home.css';

export default class Home extends Component {
  onSelect = (value: string) => {
    console.log(value);
  }

  componentWillMount() {
    this.props.actions.getItems();
  }

  render() {
    const { items } = this.props;
    console.warn(this.props.items);
    const dataSource = parseSuggestions(items);
    return (
      <div>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={dataSource}
          placeholder="try to type `b`"
          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      </div>
    );
  }
};

const parseSuggestions = (items: []=[]) => {
  if (items.length < 1) {
    return [];
  }
  const suggestions = items.map(item => item.name);
  return suggestions;
};

