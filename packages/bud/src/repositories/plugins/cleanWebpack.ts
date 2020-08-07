import {CleanWebpackPlugin as Plugin} from 'clean-webpack-plugin'
import type {CleanWebpackPlugin} from './types'

const cleanWebpack = () => ({
  make: function (): CleanWebpackPlugin {
    return new Plugin(this.options)
  },
  when: function () {
    return this.bud.features.enabled('clean')
  },
})

export {cleanWebpack}
