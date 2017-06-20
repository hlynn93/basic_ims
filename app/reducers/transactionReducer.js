import { TRANSACTION as T } from '../actions/constants';

const initialState = {
  transactions: []
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.ORDER_REQUEST:
      return state;
    case T.ORDER_FAILURE:
      return state;
    case T.ORDER_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default transactionReducer;
