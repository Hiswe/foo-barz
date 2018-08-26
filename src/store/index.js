import Vue from 'vue'
import Vuex from 'vuex'

import * as bar from './bar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bar,
  },
})
