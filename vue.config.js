const path = require('path');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue$: path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm-bundler.js'),
      },
    },
    /* module: {
      rules: [{
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      }]
    } */
  },
  chainWebpack: config => {
    /* const fontsRule = config.module.rule('fonts')
    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    fontsRule.uses.clear()
  
    fontsRule
      .test(/\.(ttf|otf|eot|woff2?)$/)
      .type('asset/inline')
      .set('generator', {
        dataUrl: content => content
      })
      .end() */

    /* config.module
      .rule("fonts")
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use("url-loader")
        .loader("url-loader")
        .tap(options => {
          options = {
            // limit: 10000,
            name: '/assets/fonts/[name].[ext]',
          }
          return options
        })
        .end() */
  }
})
