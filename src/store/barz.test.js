import test from 'ava'
import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import createStateStore from './_create-test-store'
import { articles as defaultArticles } from './default-data'

test.beforeEach(t => {
  const store = createStateStore()
  t.context.store = store
  t.context.newBar = store.getters.blankBar()
  t.context.newBar.name = `new-bar`
})

test(`get a blank bar`, t => {
  const { store, newBar } = t.context
  t.true(shortid.isValid(newBar.id), `have an id has be generated`)
  t.is(
    defaultArticles.length,
    newBar.articles.length,
    `have the same number of articles`,
  )
  t.is(
    defaultArticles.reduce((acc, article) => `${acc}${article.name}`, ``),
    newBar.articles.reduce((acc, article) => `${acc}${article.name}`, ``),
    `articles have the same names than default`,
  )
  t.is(
    defaultArticles.reduce((acc, article) => `${acc}${article.price}`, ``),
    newBar.articles.reduce((acc, article) => `${acc}${article.price}`, ``),
    `articles have the same prices than default`,
  )
  t.is(
    defaultArticles.reduce((acc, article) => `${acc}${article.icon}`, ``),
    newBar.articles.reduce((acc, article) => `${acc}${article.icon}`, ``),
    `articles have the same icons than default`,
  )
  t.not(
    defaultArticles.reduce((acc, article) => `${acc}${article.id}`, ``),
    newBar.articles.reduce((acc, article) => `${acc}${article.id}`, ``),
    `articles have different ids than default`,
  )
  const anotherBar = store.getters.blankBar()
  t.not(newBar.id, anotherBar.id, `avery time it's called has a different ID`)
  t.not(
    newBar.articles.reduce((acc, article) => `${acc}${article.id}`, ``),
    anotherBar.articles.reduce((acc, article) => `${acc}${article.id}`, ``),
    `articles have different ids`,
  )
})

test(`create`, t => {
  const { store, newBar } = t.context
  t.is(store.state.barz.ids.length, 1)
  store.commit(`UPDATE_BAR`, newBar)
  t.is(store.state.barz.ids.length, 2, `a new bar has been added`)
  t.true(
    store.state.barz.ids.includes(newBar.id),
    `the id list has been updated`,
  )
  t.truthy(
    store.state.barz.entities[newBar.id],
    `the entities list has been update `,
  )
  const createdBar = store.state.barz.entities[newBar.id]
  t.is(newBar.name, createdBar.name, `the new bar has the right name`)
  t.true(shortid.isValid(createdBar.id), `have an id has be generated`)
})

test(`edit`, t => {
  const { store, newBar } = t.context
  store.commit(`UPDATE_BAR`, newBar)
  store.commit(`UPDATE_BAR`, newBar)
  t.is(store.state.barz.ids.length, 2, `can't add a bar with the same id`)
  const update = clonedeep(newBar)
  update.name = `clapou`
  store.commit(`UPDATE_BAR`, update)
  t.is(store.state.barz.ids.length, 2, `update doesn't create a new bar`)
  t.is(store.state.barz.entities[newBar.id].name, `clapou`, `can update`)
})

test(`delete`, t => {
  const { store, newBar } = t.context
  store.commit(`UPDATE_BAR`, newBar)
  store.commit(`REMOVE_BAR`, { barId: newBar.id })
  t.is(store.state.barz.ids.length, 1, `bar id has been erased`)
  t.falsy(store.state.barz.entities[newBar.id], `bar entity has been erased`)
  store.commit(`REMOVE_BAR`, { barId: store.state.barz.ids[0] })
  t.is(store.state.barz.ids.length, 1, `can't remove default bar`)
})

test(`reset`, t => {
  const { store, newBar } = t.context
  store.commit(`UPDATE_BAR`, newBar)
  const defaultBar = clonedeep(
    store.state.barz.entities[store.state.barz.ids[0]],
  )
  defaultBar.name = `pouic`
  store.commit(`UPDATE_BAR`, defaultBar)
  t.is(
    store.state.barz.entities[store.state.barz.ids[0]].name,
    `pouic`,
    `default bar can be renamed`,
  )
  store.commit(`RESET`)
  t.is(store.state.barz.ids.length, 1)
  t.is(store.state.barz.entities[store.state.barz.ids[0]].name, `generic`)
})
