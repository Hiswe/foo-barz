export const state = () => ({
  shops: [],
})

export const mutations = {
  ADD_BAR(state, name) {
    if (typeof name !== `string`) return
    name = name.trim()
    if (!(name.length > 0)) return
    state.shops = [...new Set(state.shops.push(name))]
  },
}
