import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import { bar as defaultBar, articles as defaultArticles } from './default-data'

export const state = () => ({
  list: [defaultBar],
  entities: {
    [defaultBar.id]: clonedeep(defaultBar),
  },
  ids: [defaultBar.id],
})

export const getters = {
  blankBar: () => () => {
    return {
      name: `new-bar`,
      id: shortid.generate(),
      articles: clonedeep(defaultArticles).map(article => {
        article.id = shortid.generate()
        return article
      }),
    }
  },
}

export const mutations = {
  UPDATE_BAR(state, barWithItems) {
    barWithItems.name = barWithItems.name.trim()
    const barIndex = state.list.findIndex(bar => bar.id === barWithItems.id)
    if (barIndex < 0) return state.list.push(barWithItems)
    state.list.splice(barIndex, 1, barWithItems)
  },
  REMOVE_BAR(state, payload) {
    const { barId } = payload
    const bar = state.list.find(bar => bar.id === barId)
    if (!bar) return
    if (bar.isDefault) return
    return (state.list = state.list.filter(bar => bar.id !== barId))
  },
  RESET(state) {
    state.list = [defaultData.bar]
  },
}
