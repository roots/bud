import TerserPlugin from 'terser-webpack-plugin'
import type {WebpackAdapter} from './types'

const terser = () => ({
  setOptions: function () {
    return {
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }
  },
  make: function () {
    return new TerserPlugin(this.options)
  },
  when: function () {
    return this.bud.features.enabled('terser') && this.bud.features.enabled('minify')
  },
})

export {terser}
