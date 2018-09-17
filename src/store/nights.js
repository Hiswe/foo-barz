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
  const all = night.products.reduce((total, { price }) => total + price, 0)
  const personsNumber = night.persons.length
  const isSingleBill = personsNumber < 2
  const perPerson = isSingleBill ? false : Math.round(total / personsNumber)
  return { all, perPerson }
}

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
  [COMPUTE_NIGHT](state, payload) {
    const { nightId } = payload
    const night = state.list.find(night => night.id === nightId)
    const all = night.articles.reduce((total, { price }) => total + price, 0)
    const personsNumber = night.persons.length
    const isSingleBill = personsNumber < 2
    const perPerson = isSingleBill ? false : Math.round(all / personsNumber)
    night.total = { all, perPerson }
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
