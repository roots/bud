import type {Module} from '@roots/bud-typings'
import type Plugin from 'image-minimizer-webpack-plugin'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## imagemin
     *
     * Modify image minimizer options.
     *
     * ### Usage
     *
     * ```js
     * app.imagemin({
     *   plugins: [
     *    // ...
     *   ]
     * })
     * ```
     */
    imagemin: Framework.Imagemin.Configure
  }

  export namespace Framework.Imagemin {
    type Configure = (
      options: Imagemin.Options['minimizerOptions'],
    ) => Framework

    export type Options = {
      minimizerOptions: {
        plugins: [string, {[key: string]: any}][]
      }
    }

    /**
     * Make.
     */
    export type Make = Module.Make<Plugin, Options>
  }
}
