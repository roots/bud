import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

/**
 * BrowserSync plugin adapter.
 */
const browserSync: WebpackPluginAdapter = () => ({
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

import type {WebpackPluginAdapter} from './'
