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

const order = (transactions: []=[]) => (
  (dispatch) => {
    dispatch(orderRequest());
    return db.addOrder()
    .then((response) => {
      if (response.error) {
        return dispatch(orderFailure(response.error));
      }
      const { statement } = response;
      const newTransactions = transactions.map(t => ({ ...t, orderId: statement.lastID }));
      return db.addTransactions(newTransactions);
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

module.exports = {
  order,
  updateTransactions
};
