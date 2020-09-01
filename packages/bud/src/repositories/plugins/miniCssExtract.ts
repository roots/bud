import {MiniCssExtractPlugin} from './externals'
import {Plugin} from '@roots/bud-typings'

const miniCssExtract: Plugin = bud => ({
  bud,

  options: {
    hmr: bud.features.enabled('dev'),
    filename: bud.features.enabled('hash')
      ? `${bud.options.get('filenameTemplate').hashed}.css`
      : `${bud.options.get('filenameTemplate').default}.css`,
  },

  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },

  when: function () {
    return !this.bud.features.enabled('dev')
  },
})

export {miniCssExtract}
