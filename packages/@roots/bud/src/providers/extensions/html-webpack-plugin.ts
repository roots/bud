import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'

export const name = `html-webpack-plugin`

/**
 * Options
 */
export const options: Module.Options<HtmlWebpackPlugin.Options> = (
  app: Framework,
) => ({
  alwaysWriteToDisk: true,
  base: app.subscribe('location/project', 'html-webpack-plugin'),
  inject: true,
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
> = options => new HtmlWebpackPlugin(options.all())

/**
 * Conditions
 */
export const when: Module.When = ({store, subscribe}) =>
  store.isTrue('options.html.enabled')
