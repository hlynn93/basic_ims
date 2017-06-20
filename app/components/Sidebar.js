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
        key={item.id}
        name={item.name}
        active={item.name === activeItem}
        onClick={this.handleItemClick}
      >
        <Link className="sidebar-link" to={item.router}>{item.name}</Link>
      </Menu.Item>
    );

    return (
      <div className={styles.sidebar}>
        <Menu vertical>
          {menuItems}
        </Menu>
      </div>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
