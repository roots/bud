import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
var fixStyleOnlyEntries = function () {
  return {
    options: {
      silent: true,
    },
    make: function () {
      if (this.bud.features.enabled('hot')) {
        this.options.ignore = 'webpack-hot-middleware'
      }
      return new FixStyleOnlyEntriesPlugin(this.options)
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
export {fixStyleOnlyEntries}
//# sourceMappingURL=fixStyleOnlyEntries.js.map
