import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type {WebpackAdapter} from './types'

const miniCssExtract: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      filename: this.bud.state.features.hash
        ? `[name].[hash:8].css`
        : '[name].css',
    }
  },
  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },
})

export {miniCssExtract}
