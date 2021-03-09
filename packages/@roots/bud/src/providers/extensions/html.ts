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
  base: app.store.get('webpack.context'),
  inject: true,
  template: app.hooks.filter(
    'html-webpack-plugin.template',
    app.disk.path.resolve(
      require.resolve('@roots/bud-support'),
      '../../../publish/template.html',
    ),
  ),
})

/**
 * Make plugin
 */
export const make: Module.Make<
  HtmlWebpackPlugin,
  Module.Options<HtmlWebpackPlugin.Options>
> = (options, app) =>
  new HtmlWebpackPlugin({
    ...options.all(),
  })

/**
 * Conditions
 */
export const when: Module.When = ({store}) =>
  store.isTrue('options.html.enabled')
