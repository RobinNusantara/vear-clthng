import {CartActionTypes} from '../helpers/helpers';

function addProductToCartSuccess() {
  return {
    type: CartActionTypes.ADD_ITEM_TO_CART_SUCCESS,
  };
}

function addProductToCartFailed(error) {
  return {
    type: CartActionTypes.ADD_ITEM_TO_CART_FAILED,
    payload: error,
  };
}

export function addProductToCart(uid, data) {
  return (dispatch, getState, getFirebase) => {
    return getFirebase().firestore()
        .collection('users')
        .doc(uid)
        .collection('cart')
        .add(data)
        .then(() => dispatch(addProductToCartSuccess()))
        .catch((error) => dispatch(addProductToCartFailed(error)));
  };
}

export function removeProductFromCart(uid, id) {
  return (dispatch, getState, getFirebase) => {
    return getFirebase().firestore()
        .collection('users')
        .doc(uid)
        .collection('cart')
        .doc(id)
        .delete()
        .then(() => dispatch({type: CartActionTypes.REMOVE_ITEM_FROM_CART}));
  };
}