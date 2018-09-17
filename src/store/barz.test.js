import test from 'ava'
import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import createStateStore from './_create-test-store'
import { articles as defaultArticles } from './default-data'

test.beforeEach(t => {
  t.context.store = createStateStore()
})

test(`get a blank bar`, t => {
  const { store } = t.context
  const bar = store.getters.blankBar()
  bar.name = `new-bar`
  t.true(shortid.isValid(bar.id), `have an id has be generated`)
  t.is(
    defaultArticles.length,
    bar.articles.length,
    `have the same number of articles`,
  )
  t.is(
    defaultArticles.reduce((acc, article) => `${acc}${article.name}`, ``),
    bar.articles.reduce((acc, article) => `${acc}${article.name}`, ``),
    `articles have the same names than default`,
  )
  t.is(
    defaultArticles.reduce((acc, article) => `${acc}${article.price}`, ``),
    bar.articles.reduce((acc, article) => `${acc}${article.price}`, ``),
    `articles have the same prices than default`,
  )
  t.is(
    defaultArticles.reduce((acc, article) => `${acc}${article.icon}`, ``),
    bar.articles.reduce((acc, article) => `${acc}${article.icon}`, ``),
    `articles have the same icons than default`,
  )
  t.not(
    defaultArticles.reduce((acc, article) => `${acc}${article.id}`, ``),
    bar.articles.reduce((acc, article) => `${acc}${article.id}`, ``),
    `articles have different ids than default`,
  )
  const anotherBar = store.getters.blankBar()
  t.not(bar.id, anotherBar.id, `avery time it's called has a different ID`)
  t.not(
    bar.articles.reduce((acc, article) => `${acc}${article.id}`, ``),
    anotherBar.articles.reduce((acc, article) => `${acc}${article.id}`, ``),
    `articles have different ids`,
  )
})

test(`create`, t => {
  const { store } = t.context
  t.is(store.state.barz.list.length, 1)
  const payload = store.getters.blankBar()
  payload.name = `pouic`
  store.commit(`UPDATE_BAR`, payload)
  t.is(store.state.barz.list.length, 2, `a new bar has been added`)
  const newBar = store.state.barz.list[1]
  t.is(newBar.name, payload.name, `the new bar has the right name`)
  t.true(shortid.isValid(newBar.id), `have an id has be generated`)
})

test(`edit`, t => {
  const { store } = t.context
  const payload = store.getters.blankBar()
  store.commit(`UPDATE_BAR`, payload)
  t.is(store.state.barz.list.length, 2, `a new bar has been added`)
  store.commit(`UPDATE_BAR`, payload)
  t.is(store.state.barz.list.length, 2, `can't add a bar with the same id`)
  payload.name = `clapou`
  t.is(store.state.barz.list.length, 2, `update doesn't create a new bar`)
  t.is(store.state.barz.list[1].name, payload.name, `can update`)
})

test(`delete`, t => {
  const { store } = t.context
  const payload = store.getters.blankBar()
  store.commit(`UPDATE_BAR`, payload)
  t.is(store.state.barz.list.length, 2, `a new bar has been added`)
  store.commit(`REMOVE_BAR`, { barId: payload.id })
  t.is(store.state.barz.list.length, 1, `bar has been erased`)
  store.commit(`REMOVE_BAR`, { barId: store.state.barz.list[0].id })
  t.is(store.state.barz.list.length, 1, `can't remove default bar`)
})

test(`reset`, t => {
  const { store } = t.context
  const payload = store.getters.blankBar()
  store.commit(`UPDATE_BAR`, payload)
  t.is(store.state.barz.list.length, 2, `a new bar has been added`)
  const defaultBar = clonedeep(store.state.barz.list[0])
  defaultBar.name = `pouic`
  store.commit(`UPDATE_BAR`, defaultBar)
  t.is(
    store.state.barz.list[0].name,
    defaultBar.name,
    `default bar can be renamed`,
  )
  store.commit(`RESET`)
  t.is(store.state.barz.list.length, 1)
  t.is(store.state.barz.list[0].name, `generic`)
})
