import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as bar from './bar'
import * as night from './night'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bar,
    night,
  },
  plugins: [createPersistedState({ key: `foo-barz` })],
})
