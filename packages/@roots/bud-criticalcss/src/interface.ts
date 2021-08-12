import type {WebpackPlugin} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

export type Extension = WebpackPlugin<
  CriticalCssWebpackPlugin,
  CriticalCssWebpackPlugin['options']
>

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Extract critical CSS
     *
     * @usage
     * ```js
     * app.critical({
     *  // ...
     * })
     * ```
     */
    critical: CriticalCss.Configure
  }

  namespace CriticalCss {
    type Configure = (
      options: CriticalCssWebpackPlugin['options'],
    ) => Framework

    type Options = CriticalCssWebpackPlugin['options']
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-criticalcss': Extension
    }
  }
}
