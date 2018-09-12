import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueNotifications from 'vue-notification'

import App from './App.vue'
import router from './router'
import store from './store/index'
import './register-service-worker'
import i18n from './i18n'
import MainContent from '@/components/MainContent'
import SvgIcon from '@/components/ui/SvgIcons'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

Vue.use(VueClipboard)
Vue.use(VueNotifications)

Vue.component(`foobarz-main-content`, MainContent)
Vue.component(`foobarz-icon`, SvgIcon)
Vue.component(`foobarz-button`, Button)
Vue.component(`foobarz-input`, Input)

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
