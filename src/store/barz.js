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
  barz: state => pagination => {
    return state.ids.map(id => state.entities[id])
  },
  lastBarId: state => state.ids[0],
}

export const mutations = {
  CREATE_BAR(state) {
    const bar = {
      name: `new-bar`,
      id: shortid.generate(),
      articles: clonedeep(defaultArticles).map(article => {
        article.id = shortid.generate()
        return article
      }),
    }
    state.entities[bar.id] = bar
    state.ids.unshift(bar.id)
  },
  UPDATE_BAR(state, barWithItems) {
    barWithItems.name = barWithItems.name.trim()
    const { id } = barWithItems
    const existingBar = state.entities[id]
    if (existingBar) return (state.entities[id] = barWithItems)
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
