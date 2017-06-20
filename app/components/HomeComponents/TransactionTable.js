import React, { Component } from 'react';
import { Table, Icon, Button, Container } from 'semantic-ui-react';

class TransactionTable extends Component {
  props: {
    transactions: [],
    onDelete: () => void,
    onOrder: () => void
  }

  render() {
    const { transactions } = this.props;
    const entries = transactions.map((t, index) => (
      <Table.Row key={index}>
        <Table.Cell textAlign="center">{index}</Table.Cell>
        <Table.Cell textAlign="center">{t.title}</Table.Cell>
        <Table.Cell textAlign="center">{t.quantity}</Table.Cell>
        <Table.Cell textAlign="center">{t.price}</Table.Cell>
        <Table.Cell textAlign="center">
          <Icon
            size="large"
            color="red"
            name="remove"
            onClick={this.props.onDelete.bind(null, index)}
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
            onClick={this.props.onOrder}
          >
            Order
          </Button>
        </Container>
      </div>
    );
  }
}

export default TransactionTable;
