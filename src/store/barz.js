import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'
import Vue from 'vue'

import { articles as defaultArticles } from './default-data'
import {
  M_BAR_CREATE,
  M_BAR_UPDATE,
  M_BAR_DELETE,
  M_BAR_RESET,
} from './mutations'
import { BAR_CREATE, BAR_UPDATE, BAR_DELETE } from './actions'

export const state = () => ({
  entities: {},
  ids: [],
})

export const getters = {
  barz: state => pagination => {
    return state.ids
      .map(id => state.entities[id])
      .sort((a, b) => a.name > b.name)
  },
  bar: state => barId => {
    const bar = clonedeep(state.entities[barId])
    if (!bar) return false
    bar.articles = Object.values(bar.articles)
      .filter(article => !article.archived)
      .reduce((acc, article) => {
        acc[article.id] = article
        return acc
      }, {})
    return bar
  },
  getBar: state => barId => {
    const bar = clonedeep(state.entities[barId])
    if (!bar) return false
    bar.articles = Object.values(bar.articles)
      .filter(article => !article.archived)
      .reduce((acc, article) => {
        acc[article.id] = article
        return acc
      }, {})
    return bar
  },
  lastBarId: state => state.ids[0],
}

export const mutations = {
  [M_BAR_CREATE](state) {
    const articles = {}

    Object.values(clonedeep(defaultArticles)).forEach(article => {
      article.id = shortid.generate()
      articles[article.id] = article
    })
    const bar = {
      name: `new-bar`,
      id: shortid.generate(),
      articles,
    }
    Vue.set(state.entities, bar.id, bar)
    state.ids.unshift(bar.id)
  },
  [M_BAR_UPDATE](state, barWithItems) {
    barWithItems.name = barWithItems.name.trim()
    const { id } = barWithItems
    const existingBar = state.entities[id]
    if (existingBar) return (state.entities[id] = barWithItems)
  },
  [M_BAR_DELETE](state, payload) {
    const { barId } = payload
    Vue.delete(state.entities, barId)
    state.ids = state.ids.filter(id => id !== barId)
  },
  [M_BAR_RESET](state) {
    state.entities = {}
    state.ids = []
  },
}

export const actions = {
  [BAR_CREATE](store) {
    store.commit(M_BAR_CREATE)
  },
  [BAR_UPDATE](store, barWithItems) {
    if (!barWithItems) return
    store.commit(M_BAR_UPDATE, barWithItems)
  },
  [BAR_DELETE](store, payload) {
    const { barId } = payload
    const bar = store.state.entities[barId]
    if (!bar) return
    store.commit(M_BAR_DELETE, payload)
  },
}
