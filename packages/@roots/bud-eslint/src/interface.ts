import '@roots/bud-extensions'
import {Options as PluginOptions} from 'eslint-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      'eslint-webpack-plugin': Module
    }
  }

  namespace Eslint {
    type Options = PluginOptions
  }
}
