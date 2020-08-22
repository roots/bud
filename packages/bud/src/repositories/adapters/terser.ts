import TerserPlugin from 'terser-webpack-plugin'

import type {Extension} from './index'

const terser: Extension = bud => ({
  bud,

  name: 'terser-webpack-plugin',

  options: bud.options.get('adapters.terser'),

  make: function () {
    return new TerserPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('minify')
  },
})

export {terser}
