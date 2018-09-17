import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import * as defaultData from './default-data'

const ADD_NIGHT = `UNSAFE_ADD_NIGHT`
const COMPUTE_NIGHT = `UNSAFE_COMPUTE_NIGHT`
const CLEAR_NIGHT = `UNSAFE_CLEAR_NIGHT`
const ADD_NIGHT_ARTICLE = `UNSAFE_ADD_NIGHT_ARTICLE`
const REMOVE_NIGHT_ARTICLE = `UNSAFE_REMOVE_NIGHT_ARTICLE`
const ADD_PERSON = `UNSAFE_ADD_PERSON`
const REMOVE_PERSON = `UNSAFE_REMOVE_PERSON`

function computeTotal(night) {
  const all = night.articles.reduce((total, { price }) => total + price, 0)
  const personsNumber = night.persons.length
  const isSingleBill = personsNumber < 2
  const perPerson = isSingleBill ? false : Math.round(all / personsNumber)
  return { all, perPerson }
}

export const state = () => ({
  list: [],
})

export const mutations = {
  [ADD_NIGHT](state, payload) {
    const { barId, barName } = payload
    state.list.unshift({
      ...clonedeep(defaultData.night),
      barId,
      barName,
      id: shortid.generate(),
      createdAt: new Date().valueOf(),
    })
  },
  [COMPUTE_NIGHT](state, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    night.total = computeTotal(night)
  },
  [ADD_NIGHT_ARTICLE](state, payload) {
    const { nightId, article } = payload
    const night = state.list.find(night => night.id === nightId)
    night.articles.push({
      ...article,
      id: shortid.generate(),
      articleId: article.id,
    })
  },
  [REMOVE_NIGHT_ARTICLE](state, payload) {
    const { nightId, articleId } = payload
    const night = state.list.find(night => night.id === nightId)
    night.articles = night.articles.filter(article => article.id !== articleId)
  },
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
  // UPDATE_BAR(state, barWithItems) {
  //   const barId = barWithItems.id
  //   const nights = state.list.filter(night => night.barId === barId)
  //   if (!nights.length) return
  //   // state.items = state.items.map(item => {
  //   //   if (!item.articleId === payload.id) return item
  //   //   const { id, ...cleanedPayload } = payload
  //   //   return Object.assign({}, item, cleanedPayload)
  //   // })
  // },
  RESET(state) {
    state.list = []
  },
}

export const actions = {
  ADD_NIGHT({ rootState, commit }, payload) {
    const { barId } = payload
    const bar = rootState.barz.list.find(bar => bar.id === barId)
    payload.barName = bar.name
    if (!bar) return
    commit(ADD_NIGHT, payload)
  },
  CLEAR_NIGHT({ commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(CLEAR_NIGHT, payload)
    commit(COMPUTE_NIGHT, payload)
  },
  ADD_NIGHT_ARTICLE({ rootState, state, commit }, payload) {
    const { barId, nightId, article } = payload
    const bar = rootState.barz.list.find(bar => bar.id === barId)
    if (!bar) return
    const night = state.list.find(night => night.id === nightId)
    const isValidNight = night && night.barId === barId
    if (!isValidNight) return
    const isValidArticle = bar.articles.includes(article)
    if (!isValidArticle) return
    commit(ADD_NIGHT_ARTICLE, payload)
    commit(COMPUTE_NIGHT, payload)
  },
  REMOVE_NIGHT_ARTICLE({ state, commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(REMOVE_NIGHT_ARTICLE, payload)
    commit(COMPUTE_NIGHT, payload)
  },
  ADD_PERSON({ state, commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(ADD_PERSON, payload)
    commit(COMPUTE_NIGHT, payload)
  },
  REMOVE_PERSON({ state, commit }, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    if (!night) return
    commit(REMOVE_PERSON, payload)
    commit(COMPUTE_NIGHT, payload)
  },
}
