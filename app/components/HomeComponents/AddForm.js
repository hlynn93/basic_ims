import React, { Component } from 'react';
import _ from 'lodash';
import { Search, Input, Form, Button, Label } from 'semantic-ui-react';

const DEFAULT_QUANTITY = 1;

const initialState = {
  isLoading: false,
  value: '',
  results: [],
  transaction: {
    quantity: DEFAULT_QUANTITY,
    price: '',
  }
};

const DECIMAL = 10;

export default class AddForm extends Component {

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

  handleResultSelect = (e: {}, result: {}) => this.setState({ value: result.title }, () => this.props.onResultSelect(result.id))

  handleQuantityChange(event, result) {
    const { value } = result;
    const { item } = this.props;

    const parsedQuantity = !isNaN(parseFloat(value, DECIMAL)) ? parseFloat(value, DECIMAL) : 0;
    this.setState({
      ...this.state,
      transaction: { ...this.state.transaction,
        quantity: result.value,
        price: parsedQuantity * item.price
      }
    });
  }

  handlePriceChange(event, result) {
    this.setState({
      ...this.state,
      transaction: {
        ...this.state.transaction,
        price: result.value
      }
    });
  }

  handleSubmit() {
    const { item } = this.props;
    const { transaction } = this.state;
    this.resetComponent();
    this.props.onSubmit({
      itemId: item.id,
      title: item.title,
      quantity: parseFloat(transaction.quantity),
      price: parseInt(transaction.price, DECIMAL) || DEFAULT_QUANTITY * item.price
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
    const { isLoading, value, results, transaction } = this.state;
    const { item } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group inline>
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
            <Form.Field>
              <Input
                labelPosition="right"
                type="text"
                value={transaction.quantity}
                disabled={_.isEmpty(item)}
                onChange={this.handleQuantityChange.bind(this)}
              >
                <input style={{ width: 60 }} />
                <Label basic>{item.unit}</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <Input
                label={{ basic: true, content: '$' }}
                labelPosition="left"
                value={transaction.price || (DEFAULT_QUANTITY * item.price)}
                disabled={_.isEmpty(item)}
                onChange={this.handlePriceChange.bind(this)}
              />
            </Form.Field>
            <Button
              type="submit"
              disabled={_.isEmpty(item)}
            >
              Submit
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
