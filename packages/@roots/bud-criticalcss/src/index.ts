import './interface'
import {CriticalCss} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

const criticalCssWebpackPlugin = {
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

const {name, options, make, when, api} = criticalCssWebpackPlugin

export default criticalCssWebpackPlugin
export {name, options, make, when, api}
