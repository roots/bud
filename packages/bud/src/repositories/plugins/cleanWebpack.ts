import {CleanWebpackPlugin} from './externals'
import type {Plugin} from '@roots/bud-types'

const cleanWebpack: Plugin = bud => ({
  bud,

  options: bud.options.get('webpack.plugins.clean'),

  make: function (): CleanWebpackPlugin {
    return new CleanWebpackPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('clean')
  },
})

export {cleanWebpack}
