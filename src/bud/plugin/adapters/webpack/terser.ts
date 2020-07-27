import TerserPlugin from 'terser-webpack-plugin'
import type {WebpackAdapter} from './types'

const terser: WebpackAdapter = () => ({
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
    return this.bud.featureEnabled('terser') &&
      this.bud.featureEnabled('minify')
  },
})

export {terser}
