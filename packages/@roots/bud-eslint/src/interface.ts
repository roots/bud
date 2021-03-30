import '@roots/bud-framework'
import {Options as PluginOptions} from 'eslint-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extensions {
    interface Definitions {
      'eslint-webpack-plugin': any
    }
  }

  interface Framework {
    /**
     * ## Configure Eslint
     *
     * Configure eslint options. You may also do your eslint
     * configuration overrides from a standard eslint config
     * location.
     */
    eslint: Framework.Eslint.Configure
  }

  namespace Framework.Eslint {
    interface Api {
      eslint: Configure
    }

    type Options = PluginOptions

    type Configure = (opts: Options) => Framework
  }
}
