import { articles, icons } from './default-data'

export const state = () => ({
  list: articles,
  icons: icons,
})

export const mutations = {
  ARTICLE_UPDATE(state, payload) {
    state.list = state.list.map(article => {
      if (article.id !== payload.id) return article
      return Object.assign({}, article, payload)
    })
  },
}
