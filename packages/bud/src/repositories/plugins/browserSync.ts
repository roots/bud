import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin'
import type {BrowserSyncPlugin} from './types'

const browserSync = () => ({
  mergeOptions: function (): Object {
    return this.bud.options.get('browserSync')
  },
  make: function (): BrowserSyncPlugin {
    return new BrowserSyncWebpackPlugin(this.options)
  },
  when: function (): boolean {
    return (
      this.bud.features.enabled('browserSync') && !this.bud.features.enabled('hot')
    )
  },
})

export {browserSync}
