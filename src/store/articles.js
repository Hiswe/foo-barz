import shortid from 'shortid'

import { products, icons } from './default-data'

export const state = () => ({
  list: products,
  icons: icons,
})

export const mutations = {
  EDIT_PRODUCT(state, product) {
    // state.products = products.map(product => {
    //   product.price = ~~product.price
    //   return product
    // })
  },
}
