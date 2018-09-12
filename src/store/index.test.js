import util from 'util'
import test from 'ava'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import * as barz from './barz'
import * as night from './night'
import * as articles from './articles'
import * as defaultData from './default-data'

test.beforeEach(t => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  t.context.store = new Vuex.Store({
    modules: {
      barz,
      night,
      articles,
    },
  })
  t.context.testArticle = defaultData.articles[0]
})

test('adding an item to the night update the total', t => {
  const { store, testArticle } = t.context
  t.is(store.state.night.items.length, 0)

  store.commit(`ADD_ITEM`, testArticle)
  t.is(store.state.night.items.length, 1)
  t.deepEqual(store.getters.totals, { all: testArticle.price, perPerson: `` })

  store.commit(`ADD_ITEM`, testArticle)
  t.is(store.state.night.items.length, 2)
  t.deepEqual(store.getters.totals, {
    all: testArticle.price * 2,
    perPerson: ``,
  })
})

test('adding more than 1 people get a per person price', t => {
  const { store, testArticle } = t.context

  store.commit(`ADD_ITEM`, testArticle)
  store.commit(`ADD_PERSON`)
  store.commit(`ADD_PERSON`)
  t.deepEqual(store.getters.totals, {
    all: testArticle.price,
    perPerson: testArticle.price / 2,
  })
})

test('update an article price reflect on the night price', t => {
  const { store, testArticle } = t.context
  const NEW_PRICE = 99
  store.commit(`ADD_ITEM`, testArticle)
  store.commit(
    `ARTICLE_UPDATE`,
    Object.assign({}, testArticle, {
      price: NEW_PRICE,
    }),
  )
  t.is(store.state.articles.list[0].price, NEW_PRICE)
  t.deepEqual(store.getters.totals, { all: NEW_PRICE, perPerson: `` })
})
