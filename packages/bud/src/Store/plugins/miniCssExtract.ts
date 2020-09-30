import Bud from '@roots/bud-types'
import {MiniCssExtractPlugin} from './externals'

const miniCssExtract: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new MiniCssExtractPlugin({
      filename: this.bud.store['features'].enabled('hash')
        ? '[name].[hash].css'
        : '[name].css',
    })
  },

  when: function () {
    return !this.bud.mode.is('development')
  },
})

export {miniCssExtract as default}
