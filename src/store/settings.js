import { M_SETTINGS_UPDATE, M_BAR_RESET, M_NIGHT_RESET } from './mutations'
import {
  SETTINGS_UPDATE_LANG,
  SETTINGS_UPDATE_CURRENCY,
  RESET_STORE,
} from './actions'

export const state = () => ({
  lang: `en`,
  languages: [`en`, `fr`, `th`],
  currency: `฿`,
  currencies: [`€`, `$`, `฿`],
})

export const getters = {
  locale: state => state.lang,
}

export const mutations = {
  [M_SETTINGS_UPDATE](state, payload = {}) {
    const { lang, currency } = payload
    state.lang = lang ? lang : state.lang
    state.currency = currency ? currency : state.currency
  },
}

export const actions = {
  [SETTINGS_UPDATE_LANG](vuexContext, payload) {
    const { commit } = vuexContext
    commit(M_SETTINGS_UPDATE, {
      lang: payload,
    })
  },
  [SETTINGS_UPDATE_CURRENCY](vuexContext, payload) {
    const { commit } = vuexContext
    commit(M_SETTINGS_UPDATE, {
      currency: payload,
    })
  },
  [RESET_STORE](vuexContext) {
    vuexContext.commit(M_BAR_RESET)
    vuexContext.commit(M_NIGHT_RESET)
  },
}
