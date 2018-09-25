import test from 'ava'
import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import createStateStore from './_create-test-store'
import { articles as defaultArticles } from './default-data'

test.beforeEach(t => {
  const store = createStateStore()
  t.context.store = store
})

function getLastBar(store) {
  return store.state.barz.entities[store.getters.lastBarId]
}

function reduceArticles(articles, key) {
  return Object.values(articles).reduce(
    (acc, article) => `${acc}${article[key]}`,
    ``,
  )
}

test(`create`, t => {
  const { store } = t.context
  t.is(store.state.barz.ids.length, 1)
  store.commit(`CREATE_BAR`)
  t.is(store.state.barz.ids.length, 2, `a new bar has been added`)
  t.truthy(
    store.state.barz.entities[store.state.barz.ids[0]],
    `the entities list has been update `,
  )
  const newBar = getLastBar(store)
  t.true(shortid.isValid(newBar.id), `have an id has be generated`)
  t.is(
    reduceArticles(defaultArticles, `name`),
    reduceArticles(newBar.articles, `name`),
    `articles have the same names than default`,
  )
  t.is(
    Object.keys(defaultArticles).length,
    Object.keys(newBar.articles).length,
    `have the same number of articles`,
  )
  t.is(
    reduceArticles(defaultArticles, `price`),
    reduceArticles(newBar.articles, `price`),
    `articles have the same prices than default`,
  )
  t.is(
    reduceArticles(defaultArticles, `icon`),
    reduceArticles(newBar.articles, `icon`),
    `articles have the same icons than default`,
  )
  t.not(
    reduceArticles(defaultArticles, `id`),
    reduceArticles(newBar.articles, `id`),
    `articles have different ids than default`,
  )
})

test(`edit`, t => {
  const { store } = t.context
  const update = clonedeep(getLastBar(store))
  update.name = `clapou`
  store.commit(`UPDATE_BAR`, update)
  t.is(getLastBar(store).name, `clapou`, `can update`)
})

test(`delete`, t => {
  const { store } = t.context
  store.commit(`CREATE_BAR`)
  const newBar = getLastBar(store)
  store.commit(`REMOVE_BAR`, { barId: newBar.id })
  t.is(store.state.barz.ids.length, 1, `bar id has been erased`)
  t.falsy(store.state.barz.entities[newBar.id], `bar entity has been erased`)
  store.commit(`REMOVE_BAR`, { barId: store.state.barz.ids[0] })
  t.is(store.state.barz.ids.length, 1, `can't remove default bar`)
})

test(`reset`, t => {
  const { store } = t.context
  store.commit(`CREATE_BAR`)
  store.commit(`RESET`)
  t.is(store.state.barz.ids.length, 1)
  t.is(getLastBar(store).name, `generic`)
})