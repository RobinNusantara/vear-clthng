export function formatPrice(data) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'}).format(data);
}

export function totalPrice(data) {
  return data.reduce((acc, val) => acc + val.productAmount * val.productPrice, 0);
}
