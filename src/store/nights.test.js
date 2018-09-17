import test from 'ava'
import shortid from 'shortid'

import createStateStore from './_create-test-store'

test.beforeEach(t => {
  const store = createStateStore()
  t.context.store = store
  const bar = store.state.barz.list[0]
  t.context.barId = bar.id
  t.context.testArticle = bar.articles[0]
})

test(`new night`, t => {
  const { store, barId } = t.context
  t.is(store.state.nights.list.length, 0)
  store.dispatch(`ADD_NIGHT`, barId)
  t.is(store.state.nights.list.length, 1, `add a new night in an existing bar`)
  store.dispatch(`ADD_NIGHT`, shortid.generate())
  t.is(store.state.nights.list.length, 1, `ignore nonexisting bar`)
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
  const { store, barId, testArticle } = t.context
  store.dispatch(`ADD_NIGHT`, barId)
  const night = store.state.nights.list[0]
  const nightId = night.id
  t.is(night.articles.length, 0)
  store.dispatch(`ADD_NIGHT_ARTICLE`, {
    barId,
    nightId,
    article: testArticle,
  })
  t.is(night.articles.length, 1, `article has been added`)
  t.is(
    night.articles[0].articleId,
    testArticle.id,
    `article keep a reference to the bar article`,
  )
  t.true(shortid.isValid(night.articles[0].id), `article has a uniq ID`)
})

test(`remove article`, t => {
  const { store, barId, testArticle } = t.context
  store.dispatch(`ADD_NIGHT`, barId)
  const night = store.state.nights.list[0]
  const nightId = night.id
  t.is(night.articles.length, 0)
  store.dispatch(`ADD_NIGHT_ARTICLE`, {
    barId,
    nightId,
    article: testArticle,
  })
  store.dispatch(`REMOVE_NIGHT_ARTICLE`, {
    nightId: shortid.generate(),
    articleId: night.articles[0].id,
  })
  t.is(
    night.articles.length,
    1,
    `doesn't do anything if a wrong nightId is passed`,
  )
  store.dispatch(`REMOVE_NIGHT_ARTICLE`, {
    nightId,
    articleId: shortid.generate(),
  })
  t.is(night.articles.length, 1, `doesn't remove article with a wrong id`)

  store.dispatch(`REMOVE_NIGHT_ARTICLE`, {
    nightId,
    articleId: night.articles[0].id,
  })
  t.is(night.articles.length, 0, `remove the article`)
})

test(`adding/removing person`, t => {
  const { store, barId } = t.context
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

test(`total computation`, t => {
  const { store, barId, testArticle } = t.context
  store.dispatch(`ADD_NIGHT`, barId)
  const night = store.state.nights.list[0]
  const nightId = night.id
  store.dispatch(`ADD_NIGHT_ARTICLE`, { barId, nightId, article: testArticle })
  t.deepEqual(
    night.total,
    { all: testArticle.price, perPerson: false },
    `recompute total`,
  )
  store.dispatch(`ADD_PERSON`, { nightId })
  t.deepEqual(
    night.total,
    { all: testArticle.price, perPerson: testArticle.price / 2 },
    `make a perPerson price in case of many guests`,
  )
  store.dispatch(`REMOVE_PERSON`, { nightId, personId: night.persons[0].id })
  t.deepEqual(
    night.total,
    { all: testArticle.price, perPerson: false },
    `recompute total when removing person`,
  )
  store.dispatch(`REMOVE_NIGHT_ARTICLE`, {
    nightId,
    articleId: night.articles[0].id,
  })
  t.is(night.articles.length, 0, `remove the article`)
  t.deepEqual(
    night.total,
    { all: 0, perPerson: false },
    `recompute total when removing product`,
  )
})
