import type {Module} from '@roots/bud-typings'
import type Plugin from 'image-minimizer-webpack-plugin'

export namespace Imagemin {
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

declare module '@roots/bud' {
  type Imagemin = (
    options: Imagemin.Options['minimizerOptions'],
  ) => Bud

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
    imagemin: Bud.Imagemin
  }

  export namespace Bud {
    export {Imagemin}
  }
}
