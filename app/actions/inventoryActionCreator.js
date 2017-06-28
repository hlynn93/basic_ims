import { INVENTORY as I } from './constants';
import { Database } from '../services';

const db = new Database();

const initInventorySuccess = () => ({
  type: I.INIT_INVENTORY_SUCCESS,
});

const getItemsRequest = () => ({
  type: I.GET_ITEMS_REQUEST,
});

const getItemsFailure = () => ({
  type: I.GET_ITEMS_FAILURE,
});

const getItemsSuccess = (items: []) => ({
  type: I.GET_ITEMS_SUCCESS,
  items
});

const getItems = (input: string='') => (
  (dispatch) => {
    dispatch(getItemsRequest());
    return db.getItems(input)
      .then(response => {
        if (response.error) {
          return dispatch(getItemsFailure(response.error));
        }
        return dispatch(getItemsSuccess(response.rows));
      })
      .catch(ex => {
        dispatch(getItemsFailure());
        console.error('Error in trying to get attendance: ', ex)
      });
  }
);

const initInventory = () => (
  dispatch => (
    db.init()
    .then(() => {
      dispatch(initInventorySuccess());
      return dispatch(getItems());
    })
  )
);

module.exports = {
  getItems,
  initInventory
};
