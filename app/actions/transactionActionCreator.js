import { TRANSACTION as T } from './constants';
import { Database } from '../services';

const db = new Database();
const DEFAULT_ERROR = "There's been an error while trying to process the order";

const orderRequest = () => ({
  type: T.ORDER_REQUEST
});

const orderFailure = (error: string=DEFAULT_ERROR) => ({
  type: T.ORDER_FAILURE,
  error
});

const orderSuccess = (message: string) => ({
  type: T.ORDER_SUCCESS,
  message
});

const updateTransactions = (transactions: []=[]) => ({
  type: T.UPDATE_TRANSACTIONS,
  transactions
});

const restockRequest = () => ({
  type: T.RESTOCK_REQUEST
});

const restockFailure = (error: string=DEFAULT_ERROR) => ({
  type: T.RESTOCK_FAILURE,
  error
});

const restockSuccess = (message: string) => ({
  type: T.RESTOCK_SUCCESS,
  message
});

const getTransactionsRequest = () => ({
  type: T.GET_TRANSACTIONS_REQUEST
});

const getTransactionsFailure = (error: string=DEFAULT_ERROR) => ({
  type: T.GET_TRANSACTIONS_FAILURE,
  error
});

const getTransactionsSuccess = (transactions: []=[], message: string='') => ({
  type: T.GET_TRANSACTIONS_SUCCESS,
  message,
  transactions
});

const order = (transactions: []=[]) => (
  (dispatch, getState) => {
    const state = getState();
    const items = state.inventory.items;
    dispatch(orderRequest());
    return db.addOrder()
    .then((response) => {
      if (response.error) {
        return dispatch(orderFailure(response.error));
      }
      const { statement } = response;
      const newTransactions = transactions.map(t => ({ ...t, orderId: statement.lastID }));
      return db.addTransactions(newTransactions, items);
    })
    .then(response => {
      if (response.error) {
        return dispatch(orderFailure(response.error));
      }
      return dispatch(orderSuccess(response.message));
    })
    .catch(ex => {
      dispatch(orderFailure());
      console.error('Error in trying to order: ', ex);
    });
  }
);

const restock = (transaction: {}={}) => (
  (dispatch, getState) => {
    const state = getState();
    const items = state.inventory.items;
    dispatch(restockRequest());
    return db.addTransaction(transaction, items)
    .then(response => {
      if (response.error) {
        return dispatch(restockFailure(response.error));
      }
      return dispatch(restockSuccess(response.message));
    })
    .catch(ex => {
      dispatch(restockFailure());
      console.error('Error in trying to restock: ', ex);
    });
  }
);

const getTransactions = (filter: {}={}) => (
  (dispatch) => {
    dispatch(getTransactionsRequest());
    return db.getTransactions()
    .then(response => {
      if (response.error) {
        return dispatch(getTransactionsFailure(response.error));
      }
      return dispatch(getTransactionsSuccess(response.rows));
    })
    .catch(ex => {
      dispatch(getTransactionsFailure());
      console.error('Error in trying to get transactions: ', ex);
    });
  }
);

module.exports = {
  order,
  restock,
  updateTransactions,
  getTransactions
};
