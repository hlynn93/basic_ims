import React, { Component } from 'react';
import { Segment, Select, Input } from 'semantic-ui-react';

import { constants as CONST } from '../../utils';

class Filters extends Component {
  props: {
    filters: {},
    onChange: () => void
  }
  render() {
    const { filters } = this.props;

    const months = Object.values(CONST.MONTHS).map((v,i) => ({ key: v, value: i + 1, text: v }));
    return (
      <div style={{ marginBottom: 10 }}>
        <Segment color="red">
          <Select
            placeholder="Select month"
            options={months}
            value={filters.month}
            onChange={this.props.onChange.bind(null, 'month')}
          />
        </Segment>
      </div>
    );
  }
}

export default Filters;
