import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const browserSync = () => ({
  mergeOptions: function () {
    return this.bud.options.browserSync
  },
  make: function () {
    return new BrowserSyncPlugin(this.options)
  },
  when: function () {
    return this.bud.features.browserSync
  },
})

export {browserSync}
