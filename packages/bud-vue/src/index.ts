import vuePlugin from './adapter'
import rule from './rule'

import type {Extension} from '@roots/bud'

const addVueStyle = (loaders: any[]) => [
  'vue-style-loader',
  ...loaders,
]

const vue: Extension = bud => ({
  bud,
  name: 'vue',
  make: function () {
    if (
      !this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.vue')
    ) {
      this.bud.options.set('webpack.resolve.extensions', [
        ...this.bud.options.get('webpack.resolve.extensions'),
        '.vue',
      ])
    }

    this.bud.alias({vue$: 'vue/dist/vue.esm.js'})

    this.bud.rules.repository.push(rule)
    this.bud.plugins.push(vuePlugin)
    this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle)
    this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle)
  },
})

export {vue}
