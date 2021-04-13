import '@roots/bud-framework'
import type Plugin from 'critical-css-webpack-plugin'

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
    type Configure = (options: CriticalCss.Options) => Framework

    /**
     * Options
     */
    type Options = {
      [key: string]: any
    }

    /**
     * Make
     */
    type Make = Framework.Module.Make<Plugin, Options>
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-criticalcss': Framework.Hooks.Extension.Subject
      'html-critical-webpack-plugin': Framework.Hooks.Extension.Subject
    }
  }
}
