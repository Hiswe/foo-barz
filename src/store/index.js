import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as barz from './barz'
import * as nights from './nights'
import * as articles from './articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    barz,
    nights,
    articles,
  },
  plugins: [createPersistedState({ key: `foo-barz` })],
})
