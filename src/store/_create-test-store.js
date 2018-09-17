import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import * as barz from './barz'
import * as night from './night'
import * as articles from './articles'

export default function createTestStore() {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  return new Vuex.Store({
    modules: {
      barz,
      night,
      articles,
    },
  })
}
