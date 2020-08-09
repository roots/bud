import type {Extension, ExtensionInterface} from '@roots/bud'
import adapter from './adapter'
import rule from './rule'

const addVueStyle = (loaders: any[]) => ['vue-style-loader', ...loaders]

/**
 * @roots/bud-vue
 *
 * Adds vue support to the Bud framework.
 */
const vue: Extension = () => ({
  make: function (this: ExtensionInterface): void {
    if (this.bud) {
      this.bud.features.set('vue', true)
      this.bud.adapters.add(adapter)
      this.bud.alias({
        vue$: 'vue/dist/vue.esm.js',
      })
      this.bud.options.set('extensions', [
        ...this.bud.options.get('extensions'),
        '.vue',
      ])

      this.bud.rules.repository = [...this.bud.rules.repository, rule]
      this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle)
      this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle)
    }
  },
})

module.exports = vue
