import Vue from 'vue'
import Router from 'vue-router'
import Barz from './views/Barz.vue'
import NewNight from './views/night-new.vue'
import NotFound from './views/NotFound.vue'

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
      component: () =>
        import(/* webpackChunkName: "barz" */ './views/Barz.vue'),
    },
    {
      path: '/barz/:barId',
      name: 'bar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "barz-edit" */ './views/BarzEdit.vue'),
    },
    {
      path: '/nights',
      name: 'nights',
      component: () =>
        import(/* webpackChunkName: "nights" */ './views/Nights.vue'),
    },

    {
      path: '/nights/:barId/:nightId',
      name: 'night',
      component: () =>
        import(/* webpackChunkName: "nights-edit" */ './views/NightEdit.vue'),
    },
    {
      path: '/information',
      name: 'information',
      component: () =>
        import(/* webpackChunkName: "information" */ './views/Information.vue'),
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
