import Vue from 'vue'
import Router from 'vue-router'
import NewNight from './views/night-new.vue'
import NotFound from './views/not-found.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: `main-navigation__link--active`,
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewNight,
    },
    {
      path: '/barz',
      name: 'barz',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "barz" */ './views/barz.vue'),
    },
    {
      path: '/barz/:barId',
      name: 'bar',
      component: () =>
        import(/* webpackChunkName: "barz-edit" */ './views/barz-edit.vue'),
    },
    {
      path: '/nights',
      name: 'nights',
      component: () =>
        import(/* webpackChunkName: "nights" */ './views/nights.vue'),
    },

    {
      path: '/nights/:barId/:nightId',
      name: 'night',
      component: () =>
        import(/* webpackChunkName: "nights-edit" */ './views/night-edit.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () =>
        import(/* webpackChunkName: "settings" */ './views/settings.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
})
