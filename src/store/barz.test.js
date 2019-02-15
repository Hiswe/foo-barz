import test from 'ava'
import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import createStateStore from './_create-test-store'
import { BAR_CREATE, BAR_UPDATE, BAR_DELETE, RESET_STORE } from './actions'
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
  t.is(store.state.barz.ids.length, 0)
  store.dispatch(BAR_CREATE)
  t.is(store.state.barz.ids.length, 1, `a new bar has been added`)
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
  store.dispatch(BAR_CREATE)
  const update = clonedeep(getLastBar(store))
  t.is(update.name, `new-bar`, `default bar`)
  update.name = `clapou`
  store.dispatch(BAR_UPDATE, update)
  t.is(getLastBar(store).name, `clapou`, `can update`)
})

test(`delete`, t => {
  const { store } = t.context
  store.dispatch(BAR_CREATE)
  const newBar = getLastBar(store)
  store.dispatch(BAR_DELETE, { barId: newBar.id })
  t.is(store.state.barz.ids.length, 0, `bar id has been erased`)
  t.falsy(store.state.barz.entities[newBar.id], `bar entity has been erased`)
})

test(`reset`, t => {
  const { store } = t.context
  store.dispatch(BAR_CREATE)
  store.dispatch(RESET_STORE)
  t.is(store.state.barz.ids.length, 0)
  t.falsy(getLastBar(store))
})

test(`bar getter`, t => {
  const { store } = t.context
  const { getBar } = store.getters
  store.dispatch(BAR_CREATE)
  const bar = getLastBar(store)
  t.false(
    getBar(shortid.generate()),
    `no bar is returned if a wrong barId is passed`,
  )
  const getterResult = getBar(bar.id)

  t.is(getterResult.id, bar.id, `the right bar is returned`)
  t.deepEqual(
    getterResult.articles,
    bar.articles,
    `has the same number of article`,
  )
  const barUpdate = clonedeep(bar)
  const articleId = Object.keys(barUpdate.articles)[0]
  barUpdate.articles[articleId].archived = true
  store.dispatch(BAR_UPDATE, barUpdate)
  const getterResultAfterBarUpdate = getBar(bar.id)
  t.is(
    Object.keys(getterResult.articles).length - 1,
    Object.keys(getterResultAfterBarUpdate.articles).length,
    `getBar filter articles depending on archived articles`,
  )
  t.falsy(
    getterResultAfterBarUpdate.articles[articleId],
    `the right article has been removed`,
  )
})
