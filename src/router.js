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
      component: () =>
        import(/* webpackChunkName: "night" */ './views/Night.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    },
  ],
})
