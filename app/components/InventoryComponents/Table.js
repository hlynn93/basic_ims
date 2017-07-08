import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Segment } from 'semantic-ui-react';

const Cell = (props: {}={}) => (
  <div style={{ textAlign: 'center' }}>
    <p>{props.value}</p>
  </div>
);

class Table extends Component {
  props: {
    items: []
  }

  columns = [
    {
      Header: 'Items',
      columns: [
        {
          Header: 'ID',
          id: "id",
          width: 80,
          accessor: d => d.id,
          Cell: row => (<Cell {...row} className="table_id" />)
        },
        {
          Header: 'Name',
          id: 'title',
          accessor: d => d.title,
          Cell: row => (<Cell {...row} className="table_item-title" />)
        },
        {
          Header: 'Quantity',
          id: 'quantity',
          accessor: d => d.quantity,
          width: 80,
          Cell: row => (<Cell {...row} className="table_quantity" />)
        },
        {
          Header: 'Unit',
          id: 'unit',
          accessor: d => d.unit,
          width: 80,
          Cell: row => (<Cell {...row} className="table_unit" />)
        },
        {
          Header: 'Price',
          id: 'price',
          accessor: d => d.price,
          Cell: row => (<Cell {...row} className='table_price'/>)
        },
      ]
    },
  ];

  render() {
    const { items } = this.props;
    return (
      <div>
        <Segment loading={items.length < 1}>
          {
            items.length > 0 &&
            <ReactTable
              ref={ref => { this.table = ref; }}
              className="-striped -highlight"
              data={items}
              columns={this.columns}
              defaultPageSize={30}
              filterable
            />
          }
        </Segment>
      </div>
    );
  }
}

Table.propTypes = {

};

export default Table;
