import '@roots/bud-extensions'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## critical
     *
     * Extract critical CSS
     *
     * ### Usage
     *
     * ```js
     * app.critical({
     *  // ...
     * })
     * ```
     */
    critical: CriticalCss.Configure
  }

  namespace CriticalCss {
    /**
     * app.critical fn
     */
    type Configure = (
      options: CriticalCssWebpackPlugin['options'],
    ) => Framework

    /**
     * Options
     */
    type Options = CriticalCssWebpackPlugin['options']

    /**
     * Make
     */
    type Make = Module.Make<CriticalCssWebpackPlugin, Options>
  }

  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-criticalcss': Module
    }
  }
}
