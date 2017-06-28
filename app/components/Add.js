import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

import { AddForm, UpdateForm } from './AddComponents';

const RESTOCK = 'restock';
const EDIT = 'edit';

const initialState = {
  item: {},
  activeTab: EDIT
};

class Add extends Component {
  props: {
    items: [],
    actions: {
      initInventory: () => void,
      restock: () => void,
      updateItem: () => void
    }
  }

  state = { ...initialState }

  componentWillMount() {
    this.props.actions.initInventory();
  }

  resetItem() {
    return this.setState({ item: {} });
  }

  handleTabClick = (e, { name }) => this.setState({ activeTab: name })

  handleResultSelect(id: number) {
    const { items } = this.props;
    this.setState({ ...this.state, item: items.find(item => item.id === id) });
  }

  handleAdd(transaction: {}={}) {
    return this.props.actions.restock(transaction)
    .then(() => this.resetItem());
  }

  handleUpdate(index: number, fields: {}={}) {
    return this.props.actions.updateItem(index, fields)
    .then(() => this.resetItem());
  }

  render() {
    const { item, activeTab } = this.state;

    const tabContent = {
      [RESTOCK]: (<AddForm
        items={this.props.items}
        item={item}
        onResultSelect={this.handleResultSelect.bind(this)}
        onSubmit={this.handleAdd.bind(this)}
      />),
      [EDIT]: (<UpdateForm
        items={this.props.items}
        item={item}
        onResultSelect={this.handleResultSelect.bind(this)}
        onSubmit={this.handleUpdate.bind(this)}
      />),
    };

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name={RESTOCK} active={activeTab === RESTOCK} onClick={this.handleTabClick} />
          <Menu.Item name={EDIT} active={activeTab === EDIT} onClick={this.handleTabClick} />
        </Menu>
        <Segment padded>
          {tabContent[activeTab]}
        </Segment>
      </div>
    );
  }
}

Add.propTypes = {

};

export default Add;
