import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin'

/**
 * BrowserSync plugin adapter.
 */
const browserSync: WebpackAdapter = () => ({
  mergeOptions: function (): Object {
    return this.bud.options.browserSync
  },
  make: function (): BrowserSyncPlugin {
    return new BrowserSyncWebpackPlugin(this.options)
  },
  when: function (): boolean {
    return this.bud.features.browserSync
  },
})

export {browserSync}

import type {WebpackAdapter} from '../..'
import type BrowserSyncPlugin from 'browser-sync-webpack-plugin'
