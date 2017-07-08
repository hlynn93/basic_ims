import React, { Component } from 'react';
import { Segment, Select, Button, Checkbox, Form } from 'semantic-ui-react';

class Filters extends Component {
  props: {
    filters: {},
    monthOptions: [],
    yearOptions: [],
    onChange: () => void,
    onSubmitFilter: () => void
  }
  render() {
    const { filters, onSubmitFilter, monthOptions, yearOptions } = this.props;

    return (
      <div style={{ marginBottom: 10 }}>
        <Segment color="red">
          <Select
            placeholder="Select month"
            options={monthOptions}
            value={filters.month}
            onChange={this.props.onChange.bind(null, 'month')}
          />
          <Select
            style={{ marginLeft: 10 }}
            placeholder="Select year"
            options={yearOptions}
            value={filters.year}
            onChange={this.props.onChange.bind(null, 'year')}
          />
          <Checkbox
            style={{ marginLeft: 10 }}
            checked={filters.isTransaction}
            label={{ children: 'Transactions' }}
            onChange={this.props.onChange.bind(null, 'isTransaction')}
          />
          <Button
            style={{ marginLeft: 10 }}
            color="green"
            onClick={onSubmitFilter}
          >
            Go
          </Button>
        </Segment>
      </div>
    );
  }
}

export default Filters;
