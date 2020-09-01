import type {Bud} from '@roots/bud'
import type {Plugin} from '@roots/bud-typings'
import {VueLoaderPlugin} from 'vue-loader'

/** Patched compiler.*/
import compiler from './vue-template-compiler'

const loader = require.resolve('vue-loader')

const addVueStyle = (loaders: any[]) => [
  'vue-style-loader',
  ...loaders,
]

const vue: Plugin = bud => ({
  bud,
  name: 'vue',
  make: function () {
    !this.bud.options
      .get('webpack.resolve.extensions')
      .includes('.vue') && this.bud.addExtensions(['vue'])

    this.bud.alias({vue$: 'vue/dist/vue.esm.js'})

    this.bud.patterns.set('vue', /\.vue$/)

    this.bud.loaders.set('vue', () => ({
      loader,
      options: {
        compiler,
      },
    }))

    this.bud.rules.set('vue', (bud: Bud) => ({
      test: bud.patterns.get('vue'),
      exclude: file =>
        bud.patterns.get('vendor').test(file) &&
        !/\.vue\.js/.test(file),
      use: [bud.loaders.get('vue')],
    }))

    this.bud.plugins.set('vue-loader-plugin', () => ({
      make: function () {
        return new VueLoaderPlugin()
      },
    }))

    this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle)
    this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle)
  },
})

export {vue}
