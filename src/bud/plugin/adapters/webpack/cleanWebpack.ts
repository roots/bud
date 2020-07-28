import {CleanWebpackPlugin as Plugin} from 'clean-webpack-plugin'
import type {WebpackAdapter, CleanWebpackPlugin} from './types'

const cleanWebpack: WebpackAdapter = () => ({
  make: function (): CleanWebpackPlugin {
    return new Plugin(this.options)
  },
  when: function () {
    this.bud.featureEnabled('clean')
  },
})

export {cleanWebpack}
