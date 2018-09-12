import shortid from 'shortid'

export const state = () => ({
  products: [
    {
      id: `beer`,
      icon: `beer`,
      name: `beer leo`,
      price: 70,
    },
    {
      id: `whisky`,
      icon: `whisky`,
      name: `sangsom`,
      price: 375,
    },
    {
      id: `mixer`,
      icon: `water`,
      name: `mixer`,
      price: 30,
    },
    {
      id: `ice`,
      icon: `bucket`,
      name: `ice bucket`,
      price: 30,
    },
    {
      id: `promotion`,
      icon: `promotion`,
      name: `promotion – 3 beers`,
      price: 200,
    },
  ],
  items: [],
  persons: [],
})

export const getters = {
  totals(state) {
    const total = state.items.reduce((total, item) => total + item.price, 0)
    return {
      all: total,
      perPerson:
        state.persons.length > 1
          ? Math.round(total / state.persons.length)
          : ``,
    }
  },
}

export const mutations = {
  // EDIT_PRODUCT(state, products) {
  //   state.products = products.map(product => {
  //     product.price = ~~product.price
  //     return product
  //   })
  // },
  ADD_ITEM(state, product) {
    if (!state.products.includes(product)) return
    state.items.push({
      ...product,
      id: shortid.generate(),
    })
  },
  REMOVE_ITEM(state, itemId) {
    state.items = state.items.filter(item => item.id !== itemId)
  },
  CLEAR_NIGHT(state) {
    state.items = []
    state.persons = []
  },
  ADD_PERSON(state) {
    state.persons.push({
      id: shortid.generate(),
    })
  },
  REMOVE_PERSON(state, personId) {
    state.persons = state.persons.filter(person => person.id !== personId)
  },
}
