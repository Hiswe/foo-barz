import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: `main-navigation__link--active`,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/night',
      name: 'night',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "night" */ './views/Night.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () =>
        import(/* webpackChunkName: "settings" */ './views/Articles.vue'),
    },
    {
      path: '/articles/:id',
      name: 'edit-articles',
      component: () =>
        import(/* webpackChunkName: "settings" */ './views/ArticlesNewEdit.vue'),
    },
    {
      path: '/information',
      name: 'information',
      component: () =>
        import(/* webpackChunkName: "information" */ './views/Information.vue'),
    },
  ],
})
