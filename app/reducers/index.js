// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import inventoryReducer from './inventoryReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  router,
  inventory: inventoryReducer,
  transaction: transactionReducer
});

export default rootReducer;
