import { TRANSACTION as T } from '../actions/constants';

const initialState = {
  transactions: [],
  message: '',
  error: '',
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.UPDATE_TRANSACTIONS:
      return { ...state, message: '', error: '', transactions: action.transactions };
    case T.ORDER_REQUEST:
      return { ...state, message: '', error: '' };
    case T.ORDER_FAILURE:
      return { ...state, message: '', error: action.error };
    case T.ORDER_SUCCESS:
      return { ...state, message: action.message, error: '', transactions: [] };
    case T.RESTOCK_REQUEST:
      return { ...state, message: '', error: '' };
    case T.RESTOCK_FAILURE:
      return { ...state, message: '', error: action.error };
    case T.RESTOCK_SUCCESS:
      return { ...state, message: action.message, error: '' };
    default:
      return state;
  }
};

export default transactionReducer;
