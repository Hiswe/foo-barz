import shortid from 'shortid'

export const state = () => ({
  items: [],
  persons: [],
})

export const getters = {
  totals(state) {
    const total = state.items.reduce((total, item) => total + item.price, 0)
    return {
      all: total,
      perPerson:
        state.persons.length > 1
          ? Math.round(total / state.persons.length)
          : ``,
    }
  },
}

export const mutations = {
  ADD_ITEM(state, payload) {
    state.items.push({
      ...payload,
      id: shortid.generate(),
      articleId: payload.id,
    })
  },
  ARTICLE_UPDATE(state, payload) {
    state.items = state.items.map(item => {
      if (!item.articleId === payload.id) return item
      const { id, ...cleanedPayload } = payload
      return Object.assign({}, item, cleanedPayload)
    })
  },
  REMOVE_ITEM(state, itemId) {
    state.items = state.items.filter(item => item.id !== itemId)
  },
  CLEAR_NIGHT(state) {
    state.items = []
    state.persons = []
  },
  ADD_PERSON(state) {
    if (!state.persons.length) {
      return (state.persons = [
        {
          id: shortid.generate(),
        },
        {
          id: shortid.generate(),
        },
      ])
    }
    state.persons.push({
      id: shortid.generate(),
    })
  },
  REMOVE_PERSON(state, personId) {
    if (state.persons.length < 3) return (state.persons = [])
    state.persons = state.persons.filter(person => person.id !== personId)
  },
}

export const actions = {
  ADD_ITEM({ rootState, commit }, payload) {
    if (!rootState.articles.list.includes(payload)) return
    commit(`ADD_ITEM`, payload)
  },
}
