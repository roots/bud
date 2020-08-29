import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type {Plugin} from '@roots/bud-framework'

const miniCssExtract: Plugin = bud => ({
  bud,

  options: {
    hmr: bud.features.enabled('hot'),
    filename: bud.features.enabled('hash')
      ? `${bud.options.get('filenameTemplate').hashed}.css`
      : `${bud.options.get('filenameTemplate').default}.css`,
  },

  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },

  when: function () {
    return this.bud.inProduction
  },
})

export {miniCssExtract}
