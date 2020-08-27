import BrowserSyncWebpackPlugin from 'browser-sync-webpack-plugin'

import type BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import type {Extension} from './index'

const browserSync: Extension = bud => ({
  bud,

  name: 'browser-sync-webpack-plugin',

  make: function (): BrowserSyncPlugin {
    return new BrowserSyncWebpackPlugin(this.options)
  },

  when: function () {
    return (
      this.bud.features.enabled('browsersync') &&
      !this.bud.features.enabled('hot')
    )
  },
})

export {browserSync}
