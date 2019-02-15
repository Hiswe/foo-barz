import test from 'ava'
import shortid from 'shortid'
import clonedeep from 'lodash.clonedeep'

import createStateStore from './_create-test-store'
import {
  BAR_CREATE,
  BAR_UPDATE,
  BAR_DELETE,
  NIGHT_CREATE,
  NIGHT_ARTICLE_ADD,
  NIGHT_ARTICLE_REMOVE,
  NIGHT_PERSON_ADD,
  NIGHT_PERSON_REMOVE,
  RESET_STORE,
} from './actions'

function getLastBar(store) {
  return store.state.barz.entities[store.getters.lastBarId]
}

test.beforeEach(t => {
  const store = createStateStore()
  store.dispatch(BAR_CREATE)
  t.context.store = store
  const bar = store.state.barz.entities[store.state.barz.ids[0]]
  t.context.bar = bar
  t.context.barId = bar.id
  t.context.testArticle = bar.articles[Object.keys(bar.articles)[0]]
})

test(`new night`, t => {
  const { store, bar, barId } = t.context
  const nights = store.state.nights.ids
  t.is(nights.length, 0)
  store.dispatch(NIGHT_CREATE, { barId })
  const night = store.state.nights.entities[store.state.nights.ids[0]]
  t.is(nights.length, 1, `add a new night in an existing bar`)
  t.is(night.barId, barId, `has the right bar ID`)
  t.is(night.barName, bar.name, `has the right bar name`)
  const firstNightId = store.state.nights.ids[0]
  store.dispatch(NIGHT_CREATE, { barId: shortid.generate() })
  t.is(nights.length, 1, `ignore nonexisting bar`)
  store.dispatch(NIGHT_CREATE, { barId })
  t.is(nights.length, 2, `can add multiple nights in the same bar`)
  t.is(nights[1], firstNightId, `new nights are put on top`)
})

test(`reset`, t => {
  const { store, barId } = t.context
  store.dispatch(NIGHT_CREATE, { barId })
  store.dispatch(RESET_STORE)
  t.is(store.state.nights.ids.length, 0, `can reset ids`)
  t.is(Object.keys(store.state.nights.entities).length, 0, `can reset entities`)
})

test(`add article`, t => {
  const { store, barId, testArticle } = t.context
  store.dispatch(NIGHT_CREATE, { barId })
  const nightId = store.state.nights.ids[0]
  const night = store.state.nights.entities[nightId]
  t.is(night.articles.length, 0)
  store.dispatch(NIGHT_ARTICLE_ADD, {
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
  store.dispatch(NIGHT_CREATE, { barId })
  const nightId = store.state.nights.ids[0]
  const night = store.state.nights.entities[nightId]
  store.dispatch(NIGHT_ARTICLE_ADD, {
    nightId,
    article: testArticle,
  })
  store.dispatch(NIGHT_ARTICLE_REMOVE, {
    barId,
    nightId: shortid.generate(),
    articleId: night.articles[0].id,
  })
  t.is(
    night.articles.length,
    1,
    `doesn't do anything if a wrong nightId is passed`,
  )
  store.dispatch(NIGHT_ARTICLE_REMOVE, {
    nightId,
    articleId: shortid.generate(),
  })
  t.is(night.articles.length, 1, `doesn't remove article with a wrong id`)

  store.dispatch(NIGHT_ARTICLE_REMOVE, {
    nightId,
    articleId: night.articles[0].id,
  })
  t.is(night.articles.length, 0, `remove the article`)
})

test(`adding/removing person`, t => {
  const { store, barId } = t.context
  store.dispatch(NIGHT_CREATE, { barId })
  const nightId = store.state.nights.ids[0]
  const night = store.state.nights.entities[nightId]
  t.is(night.persons.length, 0)
  store.dispatch(NIGHT_PERSON_ADD, { nightId })
  t.is(night.persons.length, 2, `always add 2 persons at first`)
  store.dispatch(NIGHT_PERSON_ADD, { nightId })
  t.is(night.persons.length, 3, `after that increment`)
  store.dispatch(NIGHT_PERSON_REMOVE, {
    nightId,
    personId: night.persons[0].id,
  })
  t.is(night.persons.length, 2, `or decrement`)
  store.dispatch(NIGHT_PERSON_REMOVE, {
    nightId,
    personId: night.persons[0].id,
  })
  t.is(night.persons.length, 0, `remove all persons if only 2 are in the night`)
})

test(`total computation`, t => {
  const { store, barId, testArticle } = t.context
  store.dispatch(NIGHT_CREATE, { barId })
  const nightId = store.state.nights.ids[0]
  const night = store.state.nights.entities[nightId]
  store.dispatch(NIGHT_ARTICLE_ADD, { barId, nightId, article: testArticle })
  t.deepEqual(
    night.total,
    { all: testArticle.price, perPerson: false },
    `recompute total`,
  )
  store.dispatch(NIGHT_PERSON_ADD, { nightId })
  t.deepEqual(
    night.total,
    { all: testArticle.price, perPerson: testArticle.price / 2 },
    `make a perPerson price in case of many guests`,
  )
  store.dispatch(NIGHT_PERSON_REMOVE, {
    nightId,
    personId: night.persons[0].id,
  })
  t.deepEqual(
    night.total,
    { all: testArticle.price, perPerson: false },
    `recompute total when removing person`,
  )
  store.dispatch(NIGHT_ARTICLE_REMOVE, {
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

test(`bar – prices update`, t => {
  const { store, barId, bar, testArticle } = t.context
  store.dispatch(NIGHT_CREATE, { barId })
  const nightId = store.state.nights.ids[0]
  store.dispatch(NIGHT_ARTICLE_ADD, {
    barId,
    nightId,
    article: testArticle,
  })
  const barUpdate = clonedeep(bar)
  barUpdate.name = `pouic`

  barUpdate.articles[Object.keys(barUpdate.articles)[0]].name = `clapou`
  barUpdate.articles[Object.keys(barUpdate.articles)[0]].price = 1000
  store.dispatch(BAR_UPDATE, barUpdate)
  const night = store.state.nights.entities[nightId]
  t.is(night.total.all, 1000, `total has been updated`)
  t.is(night.barName, `pouic`, `bar name has been updated`)
})

test(`bar – remove`, t => {
  const { store } = t.context
  store.dispatch(BAR_CREATE)
  const newBar = getLastBar(store)
  store.dispatch(NIGHT_CREATE, { barId: newBar.id })
  const night = store.state.nights.entities[store.state.nights.ids[0]]
  store.dispatch(BAR_DELETE, { barId: newBar.id })

  t.is(store.state.nights.ids.length, 0, `night remove from ids`)
  t.falsy(store.state.nights.entities[night.id], `night removed from entities`)
})
