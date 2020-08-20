import TerserPlugin from 'terser-webpack-plugin'
import type {Bud} from './types'

const terser = (bud: Bud) => ({
  bud: bud,

  setOptions: function () {
    const terser = bud.options.get('terser')

    return terser
  },

  make: function () {
    return new TerserPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('minify')
  },
})

export {terser}
