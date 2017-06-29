import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Search, Form, Input, Label } from 'semantic-ui-react';

const DEFAULT_QUANTITY = 1;
const DECIMAL = 10;

const initialState = {
  isLoading: false,
  value: '',
  results: [],
  newItem: {
    title: '',
    quantity: 0,
    price: 0,
    unit: '',
  }
};

export default class CreateForm extends Component {

  props: {
    item: {},
    onSubmit: () => void
  }

  state = { ...initialState }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ ...initialState })

  handleValueChange(type, event, result) {
    this.setState({
      newItem: Object.assign({}, this.state.newItem, {
        [type]: result.value
      })
    });
  }

  handleSubmit() {
    const { item } = this.props;
    const { newItem } = this.state;
    this.resetComponent();
    this.props.onSubmit({
      title: newItem.title,
      quantity: parseFloat(newItem.quantity),
      unit: newItem.unit,
      price: parseInt(newItem.price, 10)
    });
  }

  render() {
    const { newItem } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group>
            <Form.Input
              label="Title"
              type="text"
              value={newItem.title}
              onChange={this.handleValueChange.bind(this, 'title')}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Quantity"
              type="text"
              value={newItem.quantity}
              disabled={_.isEmpty(newItem.title)}
              onChange={this.handleValueChange.bind(this, 'quantity')}
            />
            <Form.Input
              label="Unit"
              type="text"
              value={newItem.unit}
              disabled={_.isEmpty(newItem.title)}
              onChange={this.handleValueChange.bind(this, 'unit')}
            >
              <input style={{ width: 60 }} />
            </Form.Input>
            <Form.Input
              label="Price"
              type="text"
              value={newItem.price}
              disabled={_.isEmpty(newItem.title)}
              onChange={this.handleValueChange.bind(this, 'price')}
            >
              <input style={{ width: 120 }} />
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Button
              type="submit"
              disabled={_.isEmpty(newItem.title)}
              style={{ marginLeft: 6 }}
            >
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
