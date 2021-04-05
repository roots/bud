import '@roots/bud-framework'
import type Plugin from 'image-minimizer-webpack-plugin/types'

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
    imagemin: Imagemin.Configure
  }

  namespace Imagemin {
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
    type Make = Framework.Module.Make<Plugin, Options>
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-imagemin': Framework.Hooks.Extension.Subject
      'image-minimizer-webpack-plugin': Framework.Hooks.Extension.Subject
    }
  }
}
