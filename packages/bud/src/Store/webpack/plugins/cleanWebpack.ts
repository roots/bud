import Bud from '@roots/bud-types'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'

const cleanWebpack: Bud.Plugin.Factory = bud => ({
  bud,

  options: {},

  make: function (): CleanWebpackPlugin {
    return new CleanWebpackPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('clean')
  },
})

export {cleanWebpack as default}
