import type {Bud, Extension, ExtensionInterface} from '@roots/bud'
import adapter from './adapter'
import rule from './rule'

const addVueStyle = (loaders: any[]) => [
  'vue-style-loader',
  ...loaders,
]

/**
 * @roots/bud-vue
 *
 * Adds vue support to the Bud framework.
 */
const vue: Extension = (bud: Bud) => ({
  bud,

  name: 'vue',

  make: function (this: ExtensionInterface): void {
    !this.bud.options.get('resolve.extensions').includes('.vue') &&
      this.bud.options.set('resolve.extensions', [
        ...this.bud.options.get('resolve.extensions'),
        '.vue',
      ])

    this.bud.adapters.add(adapter)

    this.bud.alias({
      vue$: 'vue/dist/vue.esm.js',
    })

    this.bud.rules.repository = [...this.bud.rules.repository, rule]
    this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle)
    this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle)
  },
})

module.exports = vue
