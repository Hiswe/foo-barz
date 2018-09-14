import shortid from 'shortid'
import cloneDeep from 'lodash.clonedeep'

import * as defaultData from './default-data'

export const getters = {
  blankBar() {
    return {
      name: `new-bar`,
      id: shortid.generate(),
      articles: defaultData.articles.map(article => {
        article.id = shortid.generate()
        return article
      }),
    }
  },
}

export const state = () => ({
  list: [defaultData.bar],
})

export const mutations = {
  UPDATE_BAR(state, payload) {
    payload.name = payload.name.trim()
    const barIndex = state.list.findIndex(bar => bar.id === payload.id)
    if (barIndex < 0) return state.list.push(payload)
    state.list = cloneDeep(state.list.splice(barIndex, 1, payload))
  },
}
