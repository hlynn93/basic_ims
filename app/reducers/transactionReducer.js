import { TRANSACTION as T } from '../actions/constants';

const initialState = {
  transactions: {
    current: [],
    all: []
  },
  message: '',
  error: '',
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.UPDATE_TRANSACTIONS:
      return { ...state,
        message: '',
        error: '',
        transactions: {
          ...state.transactions,
          current: action.transactions
        }
      };

    case T.ORDER_REQUEST:
      return { ...state, message: '', error: '' };
    case T.ORDER_FAILURE:
      return { ...state, message: '', error: action.error };
    case T.ORDER_SUCCESS:
      return { ...state,
        message: action.message,
        error: '',
        transactions: {
          ...state.transactions,
          current: []
        }
      };

    case T.RESTOCK_REQUEST:
      return { ...state, message: '', error: '' };
    case T.RESTOCK_FAILURE:
      return { ...state, message: '', error: action.error };
    case T.RESTOCK_SUCCESS:
      return { ...state, message: action.message, error: '' };

    case T.GET_TRANSACTIONS_REQUEST:
      return { ...state, message: '', error: '' };
    case T.GET_TRANSACTIONS_FAILURE:
      return { ...state, message: '', error: action.error };
    case T.GET_TRANSACTIONS_SUCCESS:
      return { ...state,
        message: action.message,
        error: '',
        transactions: {
          ...state.transactions,
          all: action.transactions
        }
      };

    default:
      return state;
  }
};

export default transactionReducer;
