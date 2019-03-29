export default function (price) {
  if (!+price || typeof price !== 'number') return `Rp. ${0}`;
  return `Rp. ${Number.parseFloat(price).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
