import './interface'
import {Framework} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

const criticalCssWebpackPlugin = {
  /**
   * Name
   */
  name: '@roots/bud-criticalcss',

  /**
   * Options
   */
  options: (): Framework.CriticalCss.Options => ({}),

  /**
   * Make
   */
  make: options => new CriticalCssWebpackPlugin(options.all()),

  /**
   * Is Production
   */
  when: ({isProduction}) => isProduction,

  /**
   * Config
   */
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

const {name, options, make, when, api} = criticalCssWebpackPlugin

export default criticalCssWebpackPlugin
export {name, options, make, when, api}
