export function formatPrice(data) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'}).format(data);
}

export function formatDate(date) {
  const timestamp = new Date(date.replace(' ', 'T'));
  return new Intl.DateTimeFormat('en-US', {dateStyle: 'medium'}).format(timestamp);
}

export function totalPrice(data) {
  return data.reduce((acc, val) => {
    const {productQuantity} = val;
    const {productPrice} = val.collection;
    return acc + productQuantity * productPrice;
  }, 0);
}

export const errorMessage = (error) => !error.length;

export function actionError(error, user, message) {
  if (!error.length) {
    return `Successfully added this product to your ${message}!`;
  } else {
    if (user) {
      return `This product already in your ${message}!`;
    } else {
      return 'You must be logged in to do this action';
    }
  }
}
