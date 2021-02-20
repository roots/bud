import type {Module} from '@roots/bud-typings'
import type Plugin from 'image-minimizer-webpack-plugin'

declare module '@roots/bud' {
  export interface Bud {
    /**
     * ## bud.imagemin
     *
     * Modify image minimizer options.
     *
     * ### Usage
     *
     * ```js
     * bud.imagemin({
     *   plugins: [
     *    // ...
     *   ]
     * })
     * ```
     */
    imagemin: Bud.Imagemin.Configure
  }

  export namespace Bud.Imagemin {
    type Configure = (
      this: Bud,
      options: Imagemin.Options['minimizerOptions'],
    ) => Bud

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
