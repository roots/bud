import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin'
import type {BrowserSyncPlugin} from './types'

const browserSync = () => ({
  mergeOptions: function (): any {
    return this.bud.options.get('browsersync')
  },
  make: function (): BrowserSyncPlugin {
    return new BrowserSyncWebpackPlugin(this.options)
  },
  when: function (): boolean {
    return (
      this.bud.features.enabled('browsersync') && !this.bud.features.enabled('hot')
    )
  },
})

export {browserSync}
