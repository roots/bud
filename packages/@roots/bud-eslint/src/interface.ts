import '@roots/bud-framework'
import type {Options as PluginOptions} from 'eslint-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    namespace Hooks.Extension {
      interface Definitions {
        'eslint-webpack-plugin': Framework.Module
      }
    }

    namespace Eslint {
      type Options = PluginOptions
    }
  }
}
