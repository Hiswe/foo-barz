import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueNotifications from 'vue-notification'

import router from './router'
import store from './store/index'
import './register-service-worker'
import i18n from './i18n'
import AlloyFingerVue from './alloy-finger'

import App from './App.vue'
import MainContent from '@/components/MainContent'
import SvgIcon from '@/components/ui/SvgIcons'
import Button from '@/components/ui/FoobarzButton'
import Input from '@/components/ui/Input'
import PageHeader from '@/components/ui/page-header'
import Article from '@/components/ui/article'
import List from '@/components/ui/list'
import ListItem from '@/components/ui/list-item'

Vue.use(VueClipboard)
Vue.use(VueNotifications)
Vue.use(AlloyFingerVue)

Vue.filter(`date`, value =>
  new Date(value).toLocaleString(`en-GB`, {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
  }),
)
Vue.filter(`price`, value => {
  return `${value}${store.state.settings.currency}`
})

Vue.component(`foobarz-main-content`, MainContent)
Vue.component(`foobarz-icon`, SvgIcon)
Vue.component(`foobarz-button`, Button)
Vue.component(`foobarz-input`, Input)
Vue.component(`foobarz-header`, PageHeader)
Vue.component(`foobarz-article`, Article)
Vue.component(`foobarz-ul`, List)
Vue.component(`foobarz-li`, ListItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount(`#app`)

////////
// FOCUS RING
////////

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add(`user-is-tabbing`)
    window.removeEventListener(`keydown`, handleFirstTab, { passive: true })
  }
}
window.addEventListener(`keydown`, handleFirstTab)
