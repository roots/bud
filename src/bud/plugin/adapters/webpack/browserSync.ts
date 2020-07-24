import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin'
import type {
  BrowserSyncPlugin,
  WebpackAdapter,
} from './types'

/**
 * BrowserSync plugin adapter.
 */
const browserSync: WebpackAdapter = () => ({
  mergeOptions: function (): Object {
    return this.bud.state.options.browserSync
  },
  make: function (): BrowserSyncPlugin {
    return new BrowserSyncWebpackPlugin(this.options)
  },
  when: function (): boolean {
    return this.bud.state.features.browserSync
  },
})

export {browserSync}
