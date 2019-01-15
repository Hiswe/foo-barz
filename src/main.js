import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueNotifications from 'vue-notification'
import focusRing from '@hiswe/focus-ring'

import router from './router'
import store from './store/index'
import './register-service-worker'
import i18n from './i18n'
import AlloyFingerVue from './alloy-finger'

import App from '@/application-root.vue'
import MainContent from '@/components/main-content'
import Input from '@/components/form/input'
import SvgIcon from '@/components/ui/svg-icons'
import Button from '@/components/ui/button'
import PageHeader from '@/components/ui/page-header'
import Article from '@/components/article/show'
import List from '@/components/ui/list'
import ListItem from '@/components/ui/list-item'
import PricePerPerson from '@/components/ui/price-per-person'

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
Vue.component(`foobarz-per-person`, PricePerPerson)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount(`#app`)

// FOCUS RING
// https://www.npmjs.com/package/@hiswe/focus-ring

focusRing()
