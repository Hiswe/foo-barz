import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import * as defaultData from './default-data'

const ADD_NIGHT = `UNSAFE_ADD_NIGHT`
const CLEAR_NIGHT = `UNSAFE_CLEAR_NIGHT`
const ADD_ITEM = `UNSAFE_ADD_ITEM`
const REMOVE_ITEM = `UNSAFE_REMOVE_ITEM`
const ADD_PERSON = `UNSAFE_ADD_PERSON`
const REMOVE_PERSON = `UNSAFE_REMOVE_PERSON`

export const state = () => ({
  list: [],
})

export const mutations = {
  [ADD_NIGHT](state, night) {
    state.list.push(night)
  },
  [CLEAR_NIGHT](state, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    night.articles = []
    night.persons = []
  },
  [ADD_ITEM](state, payload) {
    const { nightId, item } = payload
    const night = state.list.find(night => night.id === nightId)
    night.articles.push({
      ...item,
      id: shortid.generate(),
      articleId: item.id,
    })
  },
  [REMOVE_ITEM](state, payload) {
    const { nightId, itemId } = payload
    const night = state.list.find(night => night.id === nightId)
    night.items = night.articles.filter(item => item.id !== itemId)
  },
  // ARTICLE_UPDATE(state, payload) {
  //   state.items = state.items.map(item => {
  //     if (!item.articleId === payload.id) return item
  //     const { id, ...cleanedPayload } = payload
  //     return Object.assign({}, item, cleanedPayload)
  //   })
  // },
  [ADD_PERSON](state, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night.persons.length) {
      return (night.persons = [
        {
          id: shortid.generate(),
        },
        {
          id: shortid.generate(),
        },
      ])
    }
    night.persons.push({
      id: shortid.generate(),
    })
  },
  [REMOVE_PERSON](state, payload) {
    const { nightId, personId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (night.persons.length < 3) return (night.persons = [])
    night.persons = night.persons.filter(person => person.id !== personId)
  },
  RESET(state) {
    state.list = []
  },
}

export const actions = {
  ADD_NIGHT({ rootState, commit }, barId) {
    const bar = rootState.barz.list.find(bar => bar.id === barId)
    if (!bar) return
    commit(ADD_NIGHT, {
      ...clonedeep(defaultData.night),
      barId,
      id: shortid.generate(),
      createdAt: new Date().valueOf,
    })
  },
  CLEAR_NIGHT({ commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(CLEAR_NIGHT, payload)
  },
  ADD_ITEM({ rootState, state, commit }, payload) {
    const { barId, nightId, item } = payload
    const bar = rootState.barz.list.find(bar => bar.id === barId)
    if (!bar) return
    const night = state.list.find(night => night.id === nightId)
    const isValidNight = night && night.barId === barId
    if (!isValidNight) return
    const isValidItem = bar.articles.includes(item)
    if (!isValidItem) return
    commit(ADD_ITEM, payload)
  },
  REMOVE_ITEM({ state, commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(REMOVE_ITEM, payload)
  },
  ADD_PERSON({ state, commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(ADD_PERSON, payload)
  },
  REMOVE_PERSON({ state, commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(REMOVE_PERSON, payload)
  },
}
