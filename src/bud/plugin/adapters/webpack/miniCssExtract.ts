import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const miniCssExtract: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      filename: this.bud.features.hash
        ? `[name].[hash:8].css`
        : '[name].css',
    }
  },
  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },
})

export {miniCssExtract}
import type {WebpackAdapter} from '../..'
