import './interface'
import {CriticalCss, Module} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

const extension: Module<
  CriticalCssWebpackPlugin,
  CriticalCss.Options
> = {
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

export default extension
export const {name, options, make, when, api} = extension
