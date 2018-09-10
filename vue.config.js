'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { InjectManifest } = require('workbox-webpack-plugin')

const pkg = require('./package.json')
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
      new WebpackPwaManifest({
        name: pkg.name.replace(/-/g, ` `),
        short_name: pkg.name.replace(/-/g, ` `),
        description: pkg.description,
        background_color: `#000000`,
        theme_color: `#000000`,
        publicPath: `img/icons`,
        icons: [
          {
            src: path.resolve('src/assets/logo.png'),
            // same size as nuxt-pwa
            sizes: [64, 120, 144, 152, 192, 384, 512],
            destination: `img/icons`,
          },
        ],
      }),
      // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#injectmanifest_plugin_1
      new InjectManifest({
        swSrc: `src/${serviceWorkerConfig.name}`,
        swDest: serviceWorkerConfig.name,
        importWorkboxFrom: `local`,
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
}
