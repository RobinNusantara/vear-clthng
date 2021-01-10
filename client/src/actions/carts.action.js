import API from '../api/api';
import {CartActionTypes} from '../helpers/helpers';

function insertItemToCartStart() {
  return {
    type: CartActionTypes.ADD_ITEM_TO_CART_START,
  };
}

function insertItemToCartSuccess(id) {
  return {
    type: CartActionTypes.ADD_ITEM_TO_CART_SUCCESS,
    payload: id,
  };
}

function insertItemToCartFailed(error) {
  return {
    type: CartActionTypes.ADD_ITEM_TO_CART_FAILED,
    payload: error,
  };
}

function fetchCartItemsStart() {
  return {
    type: CartActionTypes.FETCH_CART_ITEMS_START,
  };
}

function fetchCartItemsSuccess(carts) {
  return {
    type: CartActionTypes.FETCH_CART_ITEMS_SUCCESS,
    payload: carts,
  };
}

function fetchCartItemsFailed(error) {
  return {
    type: CartActionTypes.FETCH_CART_ITEMS_FAILED,
    payload: error,
  };
}

function removeCartItemSuccess(id) {
  return {
    type: CartActionTypes.REMOVE_ITEM_FROM_CART,
    payload: id,
  };
}

function removeCartItemsSuccess() {
  return {
    type: CartActionTypes.REMOVE_ITEMS_FROM_CART,
  };
}

export function insertItemToCart(id) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const headers = {headers: {'Authorization': `Bearer ${token}`}};

    dispatch(insertItemToCartStart());
    API.post('carts/insert', {'collectionId': id}, headers)
        .then((res) => {
          const cart = res.data;
          dispatch(insertItemToCartSuccess(cart.data.id));
        })
        .catch((error) => {
          const message = error.response.data.messages;
          dispatch(insertItemToCartFailed(message));
        });
  };
}

export function fetchCartsItems() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const headers = {headers: {'Authorization': `Bearer ${token}`}};

    dispatch(fetchCartItemsStart());
    API.get('carts/list', headers)
        .then((res) => {
          const carts = res.data;
          dispatch(fetchCartItemsSuccess(carts.data));
        })
        .catch((error) => {
          const message = error.response.data.messages;
          dispatch(fetchCartItemsFailed(message));
        });
  };
}

export function removeItemFromCart(id) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const headers = {headers: {'Authorization': `Bearer ${token}`}};

    API.delete(`carts/remove/${id}`, headers)
        .then((res) => {
          const cart = res.data;
          dispatch(removeCartItemSuccess(cart.data.id));
        })
        .catch((error) => {
          const message = error.response.data.messages;
          console.log(message);
        });
  };
}

export function removeItemsFromCart() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const headers = {headers: {'Authorization': `Bearer ${token}`}};

    API.delete('carts/delete/all', headers)
        .then(() => dispatch(removeCartItemsSuccess()))
        .catch((error) => {
          const message = error.response.data.messages;
          console.log(message);
        });
  };
}

export function destroyCartsState() {
  return {
    type: CartActionTypes.DESTROY_CART_STATE,
  };
}