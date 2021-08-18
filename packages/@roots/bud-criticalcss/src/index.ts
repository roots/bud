import type {WebpackPlugin} from '@roots/bud-framework'
import {CriticalCss} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

type BudCriticalCssPlugin = WebpackPlugin<
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
      '@roots/bud-criticalcss': BudCriticalCssPlugin
    }
  }
}

const BudCriticalCssPlugin: BudCriticalCssPlugin = {
  name: '@roots/bud-criticalcss',

  options: (): CriticalCss.Options => ({}),

  make: options => new CriticalCssWebpackPlugin(options.all()),

  when: ({isProduction}) => isProduction,
  api: {
    critical: function (options) {
      this.hooks.on(
        'extension/@roots/bud-criticalcss/options',
        () => options,
      )

      return this
    },
  },
}

export const {name, options, make, when, api} =
  BudCriticalCssPlugin
