import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'
import Vue from 'vue'

import * as defaultData from './default-data'

const ADD_NIGHT = `ACTION_ADD_NIGHT`
const COMPUTE_NIGHT = `ACTION_COMPUTE_NIGHT`
const REMOVE_NIGHT = `ACTION_REMOVE_NIGHT`
const ADD_NIGHT_ARTICLE = `ACTION_ADD_NIGHT_ARTICLE`
const REMOVE_NIGHT_ARTICLE = `ACTION_REMOVE_NIGHT_ARTICLE`
const ADD_PERSON = `ACTION_ADD_PERSON`
const REMOVE_PERSON = `ACTION_REMOVE_PERSON`

function computeTotal(night, bar) {
  const all = night.articles.reduce(
    (total, article) => total + bar.articles[article.articleId].price,
    0,
  )
  const personsNumber = night.persons.length
  const isSingleBill = personsNumber < 2
  const perPerson = isSingleBill ? false : Math.round(all / personsNumber)
  return { all, perPerson }
}

function getNightAndBar(store, nightId, message = `NIGHT`) {
  const { rootState, state } = store
  const night = state.entities[nightId]
  if (!night) {
    console.warn(`${message} – no night`)
    return {}
  }
  const bar = rootState.barz.entities[night.barId]
  if (!bar) {
    console.warn(`${message} – no bar`)
    return {}
  }
  return {
    night,
    bar,
  }
}

export const state = () => ({
  entities: {},
  ids: [],
})

export const getters = {
  nights: state => pagination => {
    return state.ids.map(id => state.entities[id])
  },
  lastNightId: state => state.ids[0],
}

export const mutations = {
  [ADD_NIGHT](state, payload) {
    const { barId, barName } = payload
    const nightId = shortid.generate()
    state.ids.unshift(nightId)
    Vue.set(state.entities, nightId, {
      ...clonedeep(defaultData.night),
      barId,
      barName,
      id: nightId,
      createdAt: new Date().valueOf(),
    })
  },
  [REMOVE_NIGHT](state, payload) {
    const { nightId } = payload
    delete state.entities[nightId]
    state.ids = state.ids.filter(id => id !== nightId)
  },
  [COMPUTE_NIGHT](state, payload) {
    const { nightId, bar } = payload
    const night = state.entities[nightId]
    night.total = computeTotal(night, bar)
  },
  [ADD_NIGHT_ARTICLE](state, payload) {
    const { nightId, article } = payload
    const night = state.entities[nightId]
    night.articles.push({
      id: shortid.generate(),
      articleId: article.id,
    })
  },
  [REMOVE_NIGHT_ARTICLE](state, payload) {
    const { nightId, articleId } = payload
    const night = state.entities[nightId]
    night.articles = night.articles.filter(article => article.id !== articleId)
  },
  [ADD_PERSON](state, payload) {
    const { nightId } = payload
    const night = state.entities[nightId]
    if (!night.persons.length) {
      night.persons.push({
        id: shortid.generate(),
      })
    }
    night.persons.push({
      id: shortid.generate(),
    })
  },
  [REMOVE_PERSON](state, payload) {
    const { nightId, personId } = payload
    const night = state.entities[nightId]
    if (night.persons.length < 3) {
      night.persons = []
    } else {
      night.persons = night.persons.filter(person => person.id !== personId)
    }
  },
  UPDATE_BAR(state, bar) {
    const barId = bar.id
    Object.values(state.entities)
      .filter(night => night.barId === barId)
      .forEach(night => {
        night.barName = bar.name
        // bar.articles.forEach(barArticle => {
        //   const articleId = barArticle.id
        //   const { id, ...updatedArticle } = barArticle
        //   night.articles
        //     .filter(nightArticle => nightArticle.articleId === articleId)
        //     .forEach(nightArticle => {
        //       Object.assign(nightArticle, updatedArticle)
        //     })
        // })
        night.total = computeTotal(night, bar)
      })
  },
  RESET(state) {
    state.entities = {}
    state.ids = []
  },
}

export const actions = {
  ADD_NIGHT(store, payload) {
    const { barId } = payload
    const bar = store.rootState.barz.entities[barId]
    if (!bar) return console.warn(`ADD NIGHT – no bar found`)
    payload.barName = bar.name
    store.commit(ADD_NIGHT, payload)
  },
  REMOVE_NIGHT(store, payload) {
    const { nightId } = payload
    const night = store.state.entities[nightId]
    if (!night) return
    store.commit(REMOVE_NIGHT, payload)
  },
  ADD_NIGHT_ARTICLE(store, payload) {
    const { nightId, article } = payload
    const { night, bar } = getNightAndBar(store, nightId, `ADD NIGHT ARTICLE`)
    if (!night) return
    const isValidArticle = bar.articles[article.id]
    if (!isValidArticle) {
      return console.warn(`ADD NIGHT ARTICLE – no article found`)
    }
    store.commit(ADD_NIGHT_ARTICLE, payload)
    store.commit(COMPUTE_NIGHT, {
      nightId,
      bar,
    })
  },
  REMOVE_NIGHT_ARTICLE(store, payload) {
    const { nightId } = payload
    const { night, bar } = getNightAndBar(
      store,
      nightId,
      `REMOVE NIGHT ARTICLE`,
    )
    if (!night) return
    store.commit(REMOVE_NIGHT_ARTICLE, payload)
    store.commit(COMPUTE_NIGHT, {
      nightId,
      bar,
    })
  },
  ADD_PERSON(store, payload) {
    const { nightId } = payload
    const { night, bar } = getNightAndBar(store, nightId, `ADD PERSON`)
    if (!night) return
    store.commit(ADD_PERSON, payload)
    store.commit(COMPUTE_NIGHT, {
      nightId,
      bar,
    })
  },
  REMOVE_PERSON(store, payload) {
    const { nightId } = payload
    const { night, bar } = getNightAndBar(store, nightId, `REMOVE PERSON`)
    if (!night) return
    store.commit(REMOVE_PERSON, payload)
    store.commit(COMPUTE_NIGHT, {
      nightId,
      bar,
    })
  },
}