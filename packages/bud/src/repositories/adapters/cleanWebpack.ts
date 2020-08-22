import {CleanWebpackPlugin as Plugin} from 'clean-webpack-plugin'
import type {CleanWebpackPlugin} from 'clean-webpack-plugin'

import type {Extension} from './index'

const cleanWebpack: Extension = bud => ({
  bud,

  name: 'clean-webpack-plugin',

  options: bud.options.get('adapters.clean'),

  make: function (): CleanWebpackPlugin {
    return new Plugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('clean')
  },
})

export {cleanWebpack}
