import type {Plugin} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

export type Extension = Plugin<
  CriticalCssWebpackPlugin,
  CriticalCssWebpackPlugin['options']
>

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
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-criticalcss': Extension
    }
  }
}
