import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { menu } from '../utils';

import styles from './Sidebar.css';

class Sidebar extends Component {
  state = {
    activeItem: menu[0].name,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    const menuItems = menu.map(item =>
      <Menu.Item
        style={{ padding: 0 }}
        key={item.id}
        name={item.name}
        active={item.name === activeItem}
        onClick={this.handleItemClick}
      >
        <Link style={{ padding: '12px 16px', display: 'block' }} className="sidebar-link" to={item.router}>{item.name}</Link>
      </Menu.Item>
    );

    return (
      <div className={styles.sidebar}>
        <Menu secondary pointing vertical style={{ height: '100%', paddingTop: 20 }}>
          {menuItems}
        </Menu>
      </div>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
