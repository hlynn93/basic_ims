// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initInventory, updateItem, createItem } from '../actions/inventoryActionCreator';
import { restock } from '../actions/transactionActionCreator';
import Add from '../components/Add';

const mapStateToProps = state => ({
  items: state.inventory.items,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    initInventory, restock, updateItem, createItem
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
