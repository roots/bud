import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const miniCssExtract = bud => ({
  options: {
    filename: bud.features.hash
      ? `[name].[hash:8].css`
      : '[name].css',
  },
  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },
})

export {miniCssExtract}
