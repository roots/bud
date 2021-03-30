import type {Module} from '@roots/bud-framework'
import type Plugin from 'image-minimizer-webpack-plugin'

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
     *    // ...
     *   ]
     * })
     * ```
     */
    imagemin: Framework.Imagemin.Configure
  }

  namespace Framework.Imagemin {
    /**
     * app.imagemin fn
     */
    type Configure = (
      options: Imagemin.Options['minimizerOptions'],
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

  namespace Framework.Hooks.Extension {
    interface Definitions {
      'image-minimizer-webpack-plugin': any
    }
  }
}
