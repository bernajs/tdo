import WooCommerceAPI from 'woocommerce-api'

const WooCommerce = new WooCommerceAPI({
  url: 'https://tdo.mobkii.net',
  consumerKey: 'ck_066d8c61e98aa3d10ffddb9d7ebaaa085116f86d',
  consumerSecret: 'cs_570edcf90f97f3902570386a92d1dc99dab083a6',
  wpAPI: true,
  version: 'wc/v2'
})

export default WooCommerce
