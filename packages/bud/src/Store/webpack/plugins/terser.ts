import Bud from '@roots/bud-types'
import TerserPlugin from 'terser-webpack-plugin'

const terser: Bud.Plugin.Factory = bud => ({
  bud,

  options: {
    terserOptions: {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    cache: true,
    parallel: true,
  },

  make: function () {
    return new TerserPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('minify')
  },
})

export {terser as default}
