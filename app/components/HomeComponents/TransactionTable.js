import React, { Component } from 'react';
import { Table, Icon, Button, Container } from 'semantic-ui-react';

class TransactionTable extends Component {
  props: {
    transactions: [],
    items: [],
    onDelete: () => void,
    onOrder: () => void
  }

  render() {
    const { transactions, items, onOrder, onDelete } = this.props;
    const entries = transactions.map((t, index) => (
      <Table.Row key={index}>
        <Table.Cell textAlign="center">{index}</Table.Cell>
        <Table.Cell textAlign="center">{items.find(item => item.id === t.itemId).title}</Table.Cell>
        <Table.Cell textAlign="center">{t.quantity}</Table.Cell>
        <Table.Cell textAlign="center">{t.price}</Table.Cell>
        <Table.Cell textAlign="center">
          <Icon
            size="large"
            color="red"
            name="remove"
            onClick={onDelete.bind(null, index)}
          />
        </Table.Cell>
      </Table.Row>
    ));

    return (
      <div>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing textAlign="center">ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {entries}
          </Table.Body>
        </Table>
        <Container fluid>
          <Button
            floated="right"
            color="green"
            onClick={onOrder}
            disabled={transactions.length < 1}
          >
            <Icon name="add to cart" /> Order
          </Button>
        </Container>
      </div>
    );
  }
}

export default TransactionTable;
