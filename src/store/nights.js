import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'
import Vue from 'vue'
import dayjs from 'dayjs'

import * as defaultData from './default-data'
import {
  M_NIGHT_CREATE,
  M_NIGHT_COMPUTE,
  M_NIGHT_DELETE,
  M_NIGHT_ARTICLE_ADD,
  M_NIGHT_ARTICLE_REMOVE,
  M_NIGHT_PERSON_ADD,
  M_NIGHT_PERSON_REMOVE,
  M_NIGHT_RESET,
  M_BAR_UPDATE,
  M_BAR_DELETE,
} from './mutations'
import {
  NIGHT_CREATE,
  NIGHT_DELETE,
  NIGHT_ARTICLE_ADD,
  NIGHT_ARTICLE_REMOVE,
  NIGHT_PERSON_ADD,
  NIGHT_PERSON_REMOVE,
} from './actions'

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
  weeklyTotal(state) {
    const now = dayjs()
    const start = now.startOf(`week`).valueOf()
    const end = now.endOf(`week`).valueOf()

    const weeklyTotal = state.ids
      .filter(id => {
        const { createdAt } = state.entities[id]
        return createdAt > start && createdAt < end
      })
      .reduce((sum, id) => {
        const { total } = state.entities[id]
        sum = sum + (total.perPerson === false ? total.all : total.perPerson)
        return sum
      }, 0)
    return weeklyTotal
  },
  lastNightId: state => state.ids[0],
}

export const mutations = {
  [M_NIGHT_CREATE](state, payload) {
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
  [M_NIGHT_DELETE](state, payload) {
    const { nightId } = payload
    Vue.delete(state.entities, nightId)
    state.ids = state.ids.filter(id => id !== nightId)
  },
  [M_NIGHT_COMPUTE](state, payload) {
    const { nightId, bar } = payload
    const night = state.entities[nightId]
    night.total = computeTotal(night, bar)
  },
  [M_NIGHT_ARTICLE_ADD](state, payload) {
    const { nightId, article } = payload
    const night = state.entities[nightId]
    night.articles.push({
      id: shortid.generate(),
      articleId: article.id,
    })
  },
  [M_NIGHT_ARTICLE_REMOVE](state, payload) {
    const { nightId, articleId } = payload
    const night = state.entities[nightId]
    night.articles = night.articles.filter(article => article.id !== articleId)
  },
  [M_NIGHT_PERSON_ADD](state, payload) {
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
  [M_NIGHT_PERSON_REMOVE](state, payload) {
    const { nightId, personId } = payload
    const night = state.entities[nightId]
    if (night.persons.length < 3) {
      night.persons = []
    } else {
      night.persons = night.persons.filter(person => person.id !== personId)
    }
  },
  [M_BAR_UPDATE](state, bar) {
    const barId = bar.id
    Object.values(state.entities)
      .filter(night => night.barId === barId)
      .forEach(night => {
        night.barName = bar.name
        night.total = computeTotal(night, bar)
      })
  },
  [M_BAR_DELETE](state, payload) {
    const { barId } = payload
    const NightsToRemove = Object.values(state.entities)
      .filter(night => night.barId === barId)
      .forEach(night => {
        Vue.delete(state.entities, night.id)
        state.ids = state.ids.filter(id => id !== night.id)
      })
  },
  [M_NIGHT_RESET](state) {
    state.entities = {}
    state.ids = []
  },
}

export const actions = {
  [NIGHT_CREATE](store, payload) {
    const { barId } = payload
    const bar = store.rootState.barz.entities[barId]
    if (!bar) return console.warn(`ADD NIGHT – no bar found`)
    payload.barName = bar.name
    store.commit(M_NIGHT_CREATE, payload)
  },
  [NIGHT_DELETE](store, payload) {
    const { nightId } = payload
    const night = store.state.entities[nightId]
    if (!night) return
    store.commit(M_NIGHT_DELETE, payload)
  },
  [NIGHT_ARTICLE_ADD](store, payload) {
    const { nightId, article } = payload
    const { night, bar } = getNightAndBar(store, nightId, `ADD NIGHT ARTICLE`)
    if (!night) return
    const isValidArticle = bar.articles[article.id]
    if (!isValidArticle) {
      return console.warn(`ADD NIGHT ARTICLE – no article found`)
    }
    store.commit(M_NIGHT_ARTICLE_ADD, payload)
    store.commit(M_NIGHT_COMPUTE, {
      nightId,
      bar,
    })
  },
  [NIGHT_ARTICLE_REMOVE](store, payload) {
    const { nightId } = payload
    const { night, bar } = getNightAndBar(
      store,
      nightId,
      `REMOVE NIGHT ARTICLE`,
    )
    if (!night) return
    store.commit(M_NIGHT_ARTICLE_REMOVE, payload)
    store.commit(M_NIGHT_COMPUTE, {
      nightId,
      bar,
    })
  },
  [NIGHT_PERSON_ADD](store, payload) {
    const { nightId } = payload
    const { night, bar } = getNightAndBar(store, nightId, `ADD PERSON`)
    if (!night) return
    store.commit(M_NIGHT_PERSON_ADD, payload)
    store.commit(M_NIGHT_COMPUTE, {
      nightId,
      bar,
    })
  },
  [NIGHT_PERSON_REMOVE](store, payload) {
    const { nightId } = payload
    const { night, bar } = getNightAndBar(store, nightId, `REMOVE PERSON`)
    if (!night) return
    store.commit(M_NIGHT_PERSON_REMOVE, payload)
    store.commit(M_NIGHT_COMPUTE, {
      nightId,
      bar,
    })
  },
}
