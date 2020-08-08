import MiniCssExtractPlugin from 'mini-css-extract-plugin'
var miniCssExtract = function () {
  return {
    setOptions: function () {
      return {
        hmr: this.bud.features.enabled('hot'),
        filename: this.bud.features.enabled('hash')
          ? this.bud.options.get('filenameTemplate').hashed + '.css'
          : this.bud.options.get('filenameTemplate')['default'] + '.css',
      }
    },
    make: function () {
      return new MiniCssExtractPlugin(this.options)
    },
    when: function () {
      return (
        this.bud.features.enabled('css') ||
        this.bud.features.enabled('scss') ||
        this.bud.features.enabled('postcss') ||
        this.bud.features.enabled('scssModules') ||
        this.bud.features.enabled('cssModules')
      )
    },
  }
}
export {miniCssExtract}
//# sourceMappingURL=miniCssExtract.js.map
