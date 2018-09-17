import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import * as defaultData from './default-data'

export const state = () => ({
  list: [defaultData.bar],
})

export const getters = {
  blankBar: () => () => {
    return {
      name: `new-bar`,
      id: shortid.generate(),
      articles: clonedeep(defaultData.articles).map(article => {
        article.id = shortid.generate()
        return article
      }),
    }
  },
}

export const mutations = {
  UPDATE_BAR(state, payload) {
    payload.name = payload.name.trim()
    const barIndex = state.list.findIndex(bar => bar.id === payload.id)
    if (barIndex < 0) return state.list.push(payload)
    state.list.splice(barIndex, 1, payload)
  },
  REMOVE_BAR(state, payload) {
    const bar = state.list.find(bar => bar.id === payload)
    if (!bar) return
    if (bar.isDefault) return
    return (state.list = state.list.filter(bar => bar.id !== payload))
  },
  RESET(state) {
    state.list = [defaultData.bar]
  },
}
