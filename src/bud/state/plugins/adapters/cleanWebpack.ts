import {CleanWebpackPlugin as Plugin} from 'clean-webpack-plugin'
import type {WebpackAdapter, CleanWebpackPlugin} from './types'
import { Bud } from './types'

const cleanWebpack: WebpackAdapter = function () {
  return {
    make: function (): CleanWebpackPlugin {
      return new Plugin(this.options)
    },
    when: function () {
      return this.bud.features.enabled('clean')
    },
  }
}

export {cleanWebpack}
