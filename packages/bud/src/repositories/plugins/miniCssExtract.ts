import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const miniCssExtract = () => ({
  setOptions: function () {
    return {
      hmr: this.bud.features.enabled('hot'),
      filename: this.bud.features.enabled('hash')
        ? `${this.bud.options.get('filenameTemplate').hashed}.css`
        : `${this.bud.options.get('filenameTemplate').default}.css`,
    }
  },
  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },
  when: function () {
    return (
      this.bud.options.get('resolve.extensions').includes('.css') ||
      this.bud.options.get('resolve.extensions').includes('.scss') ||
      this.bud.options.get('resolve.extensions').includes('.sass')
    )
  },
})

export {miniCssExtract}
