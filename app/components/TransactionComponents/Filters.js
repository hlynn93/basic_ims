import React, { Component } from 'react';
import { Segment, Select, Button } from 'semantic-ui-react';

import { DateHelper } from '../../helpers';

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
