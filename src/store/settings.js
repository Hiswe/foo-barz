export const state = () => ({
  lang: `en`,
  languages: [`en`, `fr`, `th`],
  currency: `฿`,
  currencies: [`€`, `$`, `฿`],
})

export const getters = {
  locale: state => state.lang,
}

const UPDATE_SETTINGS = `UPDATE_SETTINGS`

export const mutations = {
  [UPDATE_SETTINGS](state, payload = {}) {
    const { lang, currency } = payload
    state.lang = lang ? lang : state.lang
    state.currency = currency ? currency : state.currency
  },
}

export const SET_LANG = `SET_LANG`
export const SET_CURRENCY = `SET_CURRENCY`

export const actions = {
  [SET_LANG](vuexContext, payload) {
    const { commit } = vuexContext
    commit(UPDATE_SETTINGS, {
      lang: payload,
    })
  },
  [SET_CURRENCY](vuexContext, payload) {
    const { commit } = vuexContext
    commit(UPDATE_SETTINGS, {
      currency: payload,
    })
  },
}
