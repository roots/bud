import '@roots/bud-framework'
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
    critical: Framework.CriticalCss.Configure
  }

  namespace Framework.CriticalCss {
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
    type Make = Framework.Module.Make<
      CriticalCssWebpackPlugin,
      Options
    >
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-criticalcss': Framework.Extension
    }
  }
}
