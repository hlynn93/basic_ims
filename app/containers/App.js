// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Sidebar } from '../components';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <Sidebar />
        <div className="main-panel">
          {this.props.children}
        </div>
      </div>
    );
  }
}
