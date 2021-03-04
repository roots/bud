import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const name = `html-webpack-plugin`

/**
 * Options
 */
export const options: Module.Options<HtmlWebpackPlugin.Options> = {
  alwaysWriteToDisk: true,
  inject: true,
}

/**
 * Make plugin
 */
export const make: Module.Make<
  HtmlWebpackPlugin,
  Module.Options<HtmlWebpackPlugin.Options>
> = (options, app) =>
  new HtmlWebpackPlugin({
    base: app.store.get('webpack.context'),
    template: app.disk.path.resolve(
      require.resolve('@roots/bud-support'),
      '../../../publish/template.html',
    ),
    ...options.all(),
  })

/**
 * Conditions
 */
export const when: Module.When = ({store}) =>
  store.enabled('options.html')
