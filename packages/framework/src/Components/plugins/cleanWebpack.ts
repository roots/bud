import * as Extension from './../../Extend/Extension'

import {CleanWebpackPlugin} from 'clean-webpack-plugin'

const cleanWebpack: Extension.Factory = bud => ({
  bud,

  options: {},

  make: function (): CleanWebpackPlugin {
    return new CleanWebpackPlugin(this.options)
  },

  when: function () {
    return this.bud.store['features'].enabled('clean')
  },
})

export {cleanWebpack as default}
