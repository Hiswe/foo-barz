import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import * as barz from './barz'
import * as nights from './nights'
import * as settings from './settings'

export default function createTestStore() {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  return new Vuex.Store({
    modules: {
      barz,
      nights,
      settings,
    },
  })
}
