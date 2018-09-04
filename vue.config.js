'use strict'

const isPreProd = process.env.OUTPUT_DIR === `pre-production`

module.exports = {
  outputDir: isPreProd ? `dist-preprod` : `dist`,
  chainWebpack: config => {
    config.module
      .rule(`i18n`)
      .resourceQuery(/blockType=i18n/)
      .type(`javascript/auto`)
      .use(`i18n`)
      .loader(`@kazupon/vue-i18n-loader`)
  },

  pluginOptions: {
    i18n: {
      locale: `en`,
      fallbackLocale: `en`,
      localeDir: `locales`,
      enableInSFC: true,
    },
  },

  pwa: {
    name: 'Foo Barz',
    themeColor: '#282D2E',
    msTileColor: '#282D2E',
    workboxOptions: {
      swDest: `foobarz-service-worker.js`,
      importWorkboxFrom: `local`,
      cacheId: `foobarz-cache-v1`,
    },
  },
}
