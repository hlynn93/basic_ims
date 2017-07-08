import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import { Segment } from 'semantic-ui-react';

const Cell = (props: {}={}) => (
  <div style={{ textAlign: 'center' }}>
    <p>{props.value}</p>
  </div>
);

export default class Table extends Component {
  props: {
    transactions: [],
    items: []
  }

  columns = [
    {
      Header: 'Transactions',
      columns: [
        {
          Header: 'Timestamp',
          id: "datetime(timestamp,'localtime')",
          width: 140,
          accessor: d => moment(d["datetime(timestamp,'localtime')"]).format('DD/MM hh:mma'),
          Cell: row => (<Cell {...row} className='table_timestamp'/>)
        },
        {
          Header: 'Item',
          id: 'itemId',
          accessor: d => this.props.items.find(i => i.id === d.itemId).title,
          Cell: row => (<Cell {...row} className='table_item-title'/>)
        },
        {
          Header: 'Quantity',
          id: 'quantity',
          accessor: d => d.quantity,
          width: 80,
          Cell: row => (<Cell {...row} className='table_quantity'/>)
        },
        {
          Header: 'Unit',
          id: 'unit',
          accessor: d => this.props.items.find(i => i.id === d.itemId).unit,
          width: 80,
          Cell: row => (<Cell {...row} className='table_unit'/>)
        },
        {
          Header: 'Amount',
          id: 'price',
          accessor: d => d.price,
          Cell: row => (<Cell {...row} className='table_amount'/>)
        },
      ]
    },
  ];

  render() {
    const { transactions, items } = this.props;

    return (
      <div>
        <Segment loading={items.length < 1}>
          {
            items.length > 0 &&
            <ReactTable
              ref="reactTable"
              className="-striped -highlight"
              data={transactions}
              columns={this.columns}
              defaultPageSize={10}
              filterable
            />
          }
        </Segment>
      </div>
    );
  }
}
