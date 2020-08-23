import CopyWebpackPlugin from 'copy-webpack-plugin'

import type {Extension} from './index'

const copy: Extension = bud => ({
  bud,

  name: 'copy-webpack-plugin',

  options: bud.options.get('webpack.plugins.copy'),

  make: function () {
    return new CopyWebpackPlugin(this.options)
  },

  when: function () {
    return this.options.patterns.length > 0
  },
})

export {copy}
