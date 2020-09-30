import Bud from '@roots/bud-types'
import {VueLoaderPlugin} from 'vue-loader'

/** Patched compiler.*/
// eslint-disable-next-line
const compiler = require('./vue-template-compiler')
// eslint-disable-next-line
const loader = require.resolve('vue-loader')

const addVueStyle = (loaders: any[]) => [
  require.resolve('vue-style-loader'),
  ...loaders,
]

const vue: Bud.Plugin.Factory = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.addExtensions(['vue'])

    this.bud.alias({vue$: 'vue/dist/vue.esm.js'})

    this.bud.rules.set('vue', () => ({
      test: /\.vue$/,
      use: [
        {
          loader,
          options: {
            compiler,
          },
        },
      ],
    }))

    this.bud.webpack.plugins.set('vue-loader-plugin', () => ({
      make: function () {
        return new VueLoaderPlugin()
      },
    }))

    this.bud.hooks.on(
      'webpack.module.rules.css.use',
      addVueStyle,
    )

    this.bud.hooks.on(
      'webpack.module.rules.scss.use',
      addVueStyle,
    )
  },
})

module.exports = vue
