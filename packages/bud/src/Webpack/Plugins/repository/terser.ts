import Bud from '@roots/bud-types'
import TerserPlugin from 'terser-webpack-plugin'

const terser: Bud.Plugin.Factory = bud => ({
  bud,

  options: bud.options.get('plugins.terser'),

  make: function () {
    return new TerserPlugin(this.options)
  },

  when: function () {
    if (this.bud) {
      return this.bud.features.enabled('minify')
    }

    return false
  },
})

export {terser as default}
