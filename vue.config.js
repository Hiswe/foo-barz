'use strict'

const webpack = require('webpack')

const serviceWorkerConfig = require('./service-worker.config.js')

const isPreProd = process.env.OUTPUT_DIR === `pre-production`

module.exports = {
  outputDir: isPreProd ? `dist-preprod` : `dist`,

  // https://github.com/vuejs/vue-cli/issues/787#issuecomment-390899673
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          SW_NAME: JSON.stringify(serviceWorkerConfig.name),
        },
      }),
    ],
  },

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
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: `src/${serviceWorkerConfig.name}`,
      swDest: serviceWorkerConfig.name,
      importWorkboxFrom: `local`,
    },
  },
}
