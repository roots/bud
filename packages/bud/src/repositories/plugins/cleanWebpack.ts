import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import type {Plugin} from '@roots/bud-framework'

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
