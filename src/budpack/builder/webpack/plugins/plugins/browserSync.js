import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const browserSync = () => ({
  setOptions: function () {
    this.options = this.bud.options.browserSync
  },
  make: function () {
    return new BrowserSyncPlugin()
  },
  when: function () {
    return this.bud.features.browserSync
  },
})

export {browserSync}
