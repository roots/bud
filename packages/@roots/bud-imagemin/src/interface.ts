import {Module} from '@roots/bud-framework'
import Plugin from 'image-minimizer-webpack-plugin/types'

declare module '@roots/bud-framework' {
  interface Framework {
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
     *     // ...
     *   ]
     * })
     * ```
     */
    imagemin: Imagemin.Config
  }

  namespace Imagemin {
    /**
     * app.imagemin fn
     */
    type Config = (
      options: Options['minimizerOptions'],
    ) => Framework

    /**
     * Options
     */
    type Options = {
      minimizerOptions: {
        plugins: [string, {[key: string]: any}][]
      }
    }

    /**
     * Make
     */
    type Make = Module.Make<Plugin, Options>
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-imagemin': Module
      'image-minimizer-webpack-plugin': Module
    }
  }
}
