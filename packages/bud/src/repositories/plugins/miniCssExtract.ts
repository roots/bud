import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import type {Extension} from './index'

const miniCssExtract: Extension = bud => ({
  bud,

  name: 'mini-css-extract-plugin',

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
    return (
      this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.css') ||
      this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.scss') ||
      this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.sass')
    )
  },
})

export {miniCssExtract}
