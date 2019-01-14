'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { InjectManifest } = require('workbox-webpack-plugin')

const pkg = require('./package.json')
const serviceWorkerConfig = require('./service-worker.config.js')

const isPreProd = process.env.OUTPUT_DIR === `pre-production`

function addStyleResource(rule) {
  rule
    .use(`style-resource`)
    .loader(`style-resources-loader`)
    .options({
      patterns: [path.resolve(__dirname, `./src/assets/theme.scss`)],
    })
}

module.exports = {
  outputDir: isPreProd ? `dist-preprod` : `dist`,

  lintOnSave: false,

  // https://github.com/vuejs/vue-cli/issues/787#issuecomment-390899673
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          SW_NAME: JSON.stringify(serviceWorkerConfig.name),
        },
      }),
      // PWA Manifest
      // https://www.npmjs.com/package/webpack-pwa-manifest
      new WebpackPwaManifest({
        name: pkg.name.replace(/-/g, ` `),
        short_name: pkg.name.replace(/-/g, ` `),
        description: pkg.description,
        background_color: `#000000`,
        theme_color: `#000000`,
        start_url: pkg.homepage,
        ios: true,
        icons: [
          {
            src: path.resolve('src/assets/logo.png'),
            // same sizes as nuxt-pwa
            sizes: [64, 120, 144, 152, 192, 384, 512],
            destination: `img/icons`,
            ios: true,
          },
        ],
      }),
      // Workbox Service Worker
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

    const types = [`vue-modules`, `vue`, `normal-modules`, `normal`]
    types.forEach(type =>
      addStyleResource(config.module.rule(`scss`).oneOf(type)),
    )
  },

  pluginOptions: {
    i18n: {
      locale: `en`,
      fallbackLocale: `en`,
      localeDir: `locales`,
      enableInSFC: true,
    },
    'style-resources-loader': {
      preProcessor: `scss`,
      patterns: [path.resolve(__dirname, `./src/assets/theme.scss`)],
    },
  },
}
