// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from '../actions/inventoryActionCreator';
import { getTransactions } from '../actions/transactionActionCreator';

import Transaction from '../components/Transaction';

const mapStateToProps = state => ({
  items: state.inventory.items,
  range: state.inventory.range,
  transactions: state.transaction.transactions.all
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getTransactions, getItems
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
