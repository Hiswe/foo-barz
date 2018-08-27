import shortid from 'shortid'

export const state = () => ({
  products: [
    {
      id: `beer`,
      icon: `beer`,
      price: 70,
      currency: `฿`,
    },
    {
      id: `whisky`,
      icon: `whisky`,
      price: 400,
      currency: `฿`,
    },
    {
      id: `mixer`,
      icon: `water`,
      price: 20,
      currency: `฿`,
    },
    {
      id: `ice`,
      icon: `bucket`,
      price: 30,
      currency: `฿`,
    },
    {
      id: `promotion`,
      icon: `promotion`,
      price: 200,
      currency: `฿`,
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
  ADD_ITEM(state, product) {
    if (!state.products.includes(product)) return
    state.items.push({
      id: shortid.generate(),
      ...product,
    })
  },
  REMOVE_ITEM(state, itemId) {
    state.items = state.items.filter(item => item.id === itemId)
  },
  ADD_PERSON(state) {
    state.persons.push({
      id: shortid.generate(),
    })
  },
  REMOVE_PERSON(state, personId) {
    state.persons = state.persons.filter(person => person.id === personId)
  },
}
