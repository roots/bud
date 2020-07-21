import {CleanWebpackPlugin as Plugin} from 'clean-webpack-plugin'

const cleanWebpack: WebpackPluginAdapter = () => ({
  make: function (): CleanWebpackPlugin {
    return new Plugin(this.options)
  },
})

export {cleanWebpack}

import type {WebpackPluginAdapter} from '.'
import type {CleanWebpackPlugin} from 'clean-webpack-plugin'
