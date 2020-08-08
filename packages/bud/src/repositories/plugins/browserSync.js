import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin'
var browserSync = function () {
  return {
    mergeOptions: function () {
      return this.bud.options.get('browserSync')
    },
    make: function () {
      return new BrowserSyncWebpackPlugin(this.options)
    },
    when: function () {
      return (
        this.bud.features.enabled('browserSync') && !this.bud.features.enabled('hot')
      )
    },
  }
}
export {browserSync}
//# sourceMappingURL=browserSync.js.map
