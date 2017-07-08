// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Inventory from '../components/Inventory';

const mapStateToProps = state => ({
  items: state.inventory.items,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({

  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
