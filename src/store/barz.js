import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import { bar as defaultBar, articles as defaultArticles } from './default-data'

export const state = () => ({
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
    const { id } = barWithItems
    const existingBar = state.entities[id]
    if (existingBar) return (state.entities[id] = barWithItems)
    state.entities[id] = barWithItems
    state.ids.push(id)
  },
  REMOVE_BAR(state, payload) {
    const { barId } = payload
    const bar = state.entities[barId]
    if (!bar) return
    if (bar.isDefault) return
    delete state.entities[barId]
    state.ids = state.ids.filter(id => id !== barId)
  },
  RESET(state) {
    state.entities = {
      [defaultBar.id]: clonedeep(defaultBar),
    }
    state.ids = [defaultBar.id]
  },
}
