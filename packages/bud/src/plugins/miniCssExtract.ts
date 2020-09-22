import {MiniCssExtractPlugin} from './externals'
import {BudInterface, Plugin} from '../'

const miniCssExtract: Plugin = (bud: BudInterface) => ({
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
