import TerserPlugin from 'terser-webpack-plugin'
var terser = function () {
  return {
    setOptions: function () {
      return {
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }
    },
    make: function () {
      return new TerserPlugin(this.options)
    },
    when: function () {
      return (
        this.bud.features.enabled('terser') && this.bud.features.enabled('minify')
      )
    },
  }
}
export {terser}
//# sourceMappingURL=terser.js.map
