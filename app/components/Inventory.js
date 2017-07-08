import React, { Component } from 'react';
import { Table } from './InventoryComponents';

class Inventory extends Component {
  render() {
    return (
      <div>
        <Table
          {...this.props}
        />
      </div>
    );
  }
}

Inventory.propTypes = {

};

export default Inventory;
