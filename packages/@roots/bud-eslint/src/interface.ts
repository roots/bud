import '@roots/bud'
import {Options as PluginOptions} from 'eslint-webpack-plugin'

declare module '@roots/bud' {
  export interface Bud {
    /**
     * ## Configure Eslint
     *
     * Configure eslint options. You may also do your eslint
     * configuration overrides from a standard eslint config
     * location.
     */
    eslint: Bud.Eslint.Configure
  }

  export namespace Bud.Eslint {
    export interface Api {
      eslint: Configure
    }

    export type Options = PluginOptions
    export type Configure = (this: Bud, opts: Options) => Bud
  }
}
