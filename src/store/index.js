import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as barz from './barz'
import * as night from './night'
import * as articles from './articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    barz,
    night,
    articles,
  },
  plugins: [createPersistedState({ key: `foo-barz` })],
})
