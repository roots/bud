import '@roots/bud-framework'
import {Options as PluginOptions} from 'eslint-webpack-plugin'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## Configure Eslint
     *
     * Configure eslint options. You may also do your eslint
     * configuration overrides from a standard eslint config
     * location.
     */
    eslint: Framework.Eslint.Configure
  }

  export namespace Framework.Eslint {
    export interface Api {
      eslint: Configure
    }

    export type Options = PluginOptions
    export type Configure = (opts: Options) => Framework
  }
}
