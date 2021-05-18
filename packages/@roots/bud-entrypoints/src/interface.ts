import {Plugin} from '@roots/bud-framework'
import {Plugin as EntrypointsPlugin} from '@roots/entrypoints-webpack-plugin'

export type Extension = Plugin<EntrypointsPlugin>

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-entrypoints': Extension
    }
  }
}
