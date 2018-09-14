import shortid from 'shortid'

import * as defaultDate from './default-data'

export const state = () => ({
  list: [defaultDate.bar],
})

export const mutations = {
  ADD_BAR(state, name) {
    if (typeof name !== `string`) return
    name = name.trim()
    if (!(name.length > 0)) return
    state.shops = [...new Set(state.shops.push(name))]
  },
}
