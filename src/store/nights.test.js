import test from 'ava'
import shortid from 'shortid'

import createStateStore from './_create-test-store'

test.beforeEach(t => {
  t.context.store = createStateStore()
})

test(`new night`, t => {
  const { store } = t.context
  t.is(store.state.nights.list.length, 0)
  store.dispatch(`ADD_NIGHT`, store.state.barz.list[0].id)
  t.is(store.state.nights.list.length, 1, `add a new night in an existing bar`)
  store.dispatch(`ADD_NIGHT`, shortid.generate())
  t.is(
    store.state.nights.list.length,
    1,
    `can't add a night inside an nonexisting bar`,
  )
})

test(`reset`, t => {
  const { store } = t.context
  t.is(store.state.nights.list.length, 0)
  store.dispatch(`ADD_NIGHT`, store.state.barz.list[0].id)
  t.is(store.state.nights.list.length, 1)
  store.commit(`RESET`)
  t.is(store.state.nights.list.length, 0, `can reset`)
})

test(`add article`, t => {
  const { store } = t.context
  const bar = store.state.barz.list[0]
  const barId = bar.id
  store.dispatch(`ADD_NIGHT`, barId)
  const night = store.state.nights.list[0]
  const nightId = night.id
  t.is(night.articles.length, 0)
  store.dispatch(`ADD_ITEM`, {
    barId,
    nightId,
    item: bar.articles[0],
  })
  t.is(night.articles.length, 1, `article has been added`)
  t.is(
    night.articles[0].articleId,
    bar.articles[0].id,
    `article keep a reference to the bar article`,
  )
  t.true(shortid.isValid(night.articles[0].id), `article has a uniq ID`)
})

test(`remove article`, t => {
  const { store } = t.context
  const bar = store.state.barz.list[0]
  const barId = bar.id
  store.dispatch(`ADD_NIGHT`, barId)
  const night = store.state.nights.list[0]
  const nightId = night.id
  t.is(night.articles.length, 0)
  store.dispatch(`ADD_ITEM`, {
    barId,
    nightId,
    item: bar.articles[0],
  })
  store.dispatch(`REMOVE_ITEM`, {
    nightId: shortid.generate(),
    itemId: night.articles[0].id,
  })
  t.is(
    night.articles.length,
    1,
    `doesn't do anything if a wrong nightId is passed`,
  )
  store.dispatch(`REMOVE_ITEM`, {
    nightId,
    itemId: shortid.generate(),
  })
  t.is(night.articles.length, 1, `doesn't remove article with a wrong id`)

  store.dispatch(`REMOVE_ITEM`, {
    nightId,
    itemId: night.articles[0].id,
  })
  t.is(night.articles.length, 1, `remove the article`)
})

test.only('adding/removing person)', t => {
  const { store } = t.context
  const bar = store.state.barz.list[0]
  const barId = bar.id
  store.dispatch(`ADD_NIGHT`, barId)
  const night = store.state.nights.list[0]
  const nightId = night.id
  t.is(night.persons.length, 0)
  store.dispatch(`ADD_PERSON`, { nightId })
  t.is(night.persons.length, 2, `always add 2 persons at first`)
  store.dispatch(`ADD_PERSON`, { nightId })
  t.is(night.persons.length, 3, `after that increment`)
  store.dispatch(`REMOVE_PERSON`, { nightId, personId: night.persons[0].id })
  t.is(night.persons.length, 2, `or decrement`)
  store.dispatch(`REMOVE_PERSON`, { nightId, personId: night.persons[0].id })
  t.is(night.persons.length, 0, `remove all persons if only 2 are in the night`)
})
