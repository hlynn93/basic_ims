// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from '../actions/inventoryActionCreator';

import Home from '../components/Home';

const mapStateToProps = state => ({
  items: state.inventory.items
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getItems
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
