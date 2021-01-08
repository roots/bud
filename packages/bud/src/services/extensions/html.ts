import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Module} from '@roots/bud-typings'

/**
 * Options
 */
export const options: Module.Options<HtmlWebpackPlugin.Options> = ({
  disk,
}) => ({
  alwaysWriteToDisk: true,
  base: disk.baseDir,
  template: disk.path.join(
    disk.path.dirname(require.resolve('@roots/bud-support')),
    '/../../publish/template.html',
  ),
})

/**
 * Make plugin
 */
export const make: Module.Make<
  HtmlWebpackPlugin,
  Module.Options<HtmlWebpackPlugin.Options>
> = (options, {store}) =>
  new HtmlWebpackPlugin({
    ...(options.all() ?? []),
    publicPath: store.get('webpack.output.publicPath'),
  })

/**
 * Conditions
 */
export const when: Module.When = ({store}) =>
  store.enabled('features.html')
