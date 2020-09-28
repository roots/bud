import Bud from '@roots/bud-types'
import {MiniCssExtractPlugin} from './externals'

const miniCssExtract: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new MiniCssExtractPlugin({
      filename: this.bud.features.enabled('hash')
        ? `${this.bud.options.get(
            'filenameTemplate.hashed',
          )}.css`
        : `${this.bud.options.get(
            'filenameTemplate.hashed',
          )}.css`,
    })
  },

  when: function () {
    return !this.bud.mode.is('development')
  },
})

export {miniCssExtract as default}
