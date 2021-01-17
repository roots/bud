import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Framework, Module} from '@roots/bud-typings'

/**
 * Options
 */
export const options: Module.Options<HtmlWebpackPlugin.Options> = app => ({
  alwaysWriteToDisk: true,
  base: app.project(),
  inject: true,
  publicPath: app.options.get('publicPath'),
  template: app.disk.path.resolve(
    require.resolve('@roots/bud-support'),
    '../../../publish/template.html',
  ),
})

/**
 * Make plugin
 */
export const make: Module.Make<
  HtmlWebpackPlugin,
  Module.Options<HtmlWebpackPlugin.Options>
> = (options, app: Framework) =>
  new HtmlWebpackPlugin({
    ...options.all(),
  })

/**
 * Conditions
 */
export const when: Module.When = ({options}) =>
  options.enabled('html')
