import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { menu } from '../utils';

import styles from './Sidebar.css';

const DARK_THEME = 'dark';

class Sidebar extends Component {
  state = {
    current: '1',
  }
  handleClick = (e: {}) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    const menuItems = menu.map(item =>
      <Menu.Item key={item.id.toString()}>
        <Link to={item.router}>{item.name}</Link>
      </Menu.Item>
    );

    return (
      <div className={styles.sidebar}>
        <Menu
          theme={DARK_THEME}
          onClick={this.handleClick}
          style={{ width: 224 }}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
