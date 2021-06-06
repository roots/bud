import {Plugin} from '@roots/bud-framework'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

type Extension = Plugin<EntrypointsWebpackPlugin>

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-entrypoints': Extension
    }
  }
}
