import {budWebpackPlugin} from './budWebpackPlugin'

import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const browserSync: budWebpackPlugin = () => ({
  mergeOptions: function (): Object {
    return this.bud.options.browserSync
  },
  make: function (): Object {
    return new BrowserSyncPlugin(this.options)
  },
  when: function (): boolean {
    return this.bud.features.browserSync
  },
})

export {browserSync}
