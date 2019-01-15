import Vue from 'vue'
import VueI18n from 'vue-i18n'

import store from '@/store'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  )
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([a-z0-9]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const i18n = new VueI18n({
  locale: store.getters.locale || process.env.VUE_APP_I18N_LOCALE || `en`,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || `en`,
  messages: loadLocaleMessages(),
})

export default i18n

// // Set i18n instance on app
//   // This way we can use it in middleware and pages asyncData/fetch
//   app.i18n = new VueI18n({
//     locale: store.getters[`user/${LOCALE}`],
//     fallbackLocale: `en`,
//     fallbackRoot: true,
//     silentTranslationWarn: true,
//     messages,
//     numberFormats,
//     dateTimeFormats,
//   })

store.watch(
  state => store.getters.locale,
  newLocale => {
    i18n.locale = newLocale
  },
)
