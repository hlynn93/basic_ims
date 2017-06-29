import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Search, Form, Input, Label } from 'semantic-ui-react';

const DEFAULT_QUANTITY = 1;
const DECIMAL = 10;

const initialState = {
  isLoading: false,
  value: '',
  results: [],
  newItem: {}
};

export default class UpdateForm extends Component {

  props: {
    items: [],
    item: {},
    onResultSelect: () => void,
    onSubmit: () => void
  }

  state = { ...initialState }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ ...initialState })

  handleResultSelect = (e: {}, result: {}) => this.setState({
    value: result.title
  }, () => this.props.onResultSelect(result.id))

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
    this.props.onSubmit(item.id, {
      title: newItem.title || item.title,
      unit: newItem.unit || item.unit,
      price: parseInt(newItem.price, 10) || item.price
    });
  }

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
    const { isLoading, value, results, newItem } = this.state;
    const { item } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group>
            <Form.Field>
              <Search
                style={{ marginBottom: 3 }}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={formatResults(results.splice(0, Math.min(5, results.length)))}
                value={value}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="New Name"
              type="text"
              value={newItem.title || item.title}
              disabled={_.isEmpty(item)}
              onChange={this.handleValueChange.bind(this, 'title')}
            />
            <Form.Input
              label="Unit"
              type="text"
              value={newItem.unit || item.unit}
              disabled={_.isEmpty(item)}
              onChange={this.handleValueChange.bind(this, 'unit')}
            >
              <input style={{ width: 60 }} />
            </Form.Input>
            <Form.Input
              label="Price"
              type="text"
              value={newItem.price || item.price}
              disabled={_.isEmpty(item)}
              onChange={this.handleValueChange.bind(this, 'price')}
            >
              <input style={{ width: 120 }} />
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Button
              type="submit"
              disabled={_.isEmpty(item)}
              style={{ marginLeft: 6 }}
            >
              Update
            </Button>
          </Form.Group>
        </Form>
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

