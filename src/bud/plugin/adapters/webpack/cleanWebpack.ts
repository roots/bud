import {CleanWebpackPlugin as Plugin} from 'clean-webpack-plugin'

const cleanWebpack: WebpackAdapter = () => ({
  make: function (): CleanWebpackPlugin {
    return new Plugin(this.options)
  },
})

export {cleanWebpack}

import type {WebpackAdapter} from '../..'
import type {CleanWebpackPlugin} from 'clean-webpack-plugin'
