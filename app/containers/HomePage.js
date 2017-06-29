// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, initInventory } from '../actions/inventoryActionCreator';
import { order, updateTransactions } from '../actions/transactionActionCreator';

import Home from '../components/Home';

const mapStateToProps = state => ({
  items: state.inventory.items,
  transactions: state.transaction.transactions.current
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getItems,
    initInventory,
    order,
    updateTransactions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
