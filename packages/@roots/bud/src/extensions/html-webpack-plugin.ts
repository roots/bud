import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Framework} from '@roots/bud-framework'
import {posix} from 'path'

/**
 * Name
 */
export const name = `html-webpack-plugin`

/**
 * Options
 */
export const options = (
  app: Framework,
): HtmlWebpackPlugin.Options => ({
  publicPath: app.publicPath(),
  template: posix.resolve(
    require.resolve('@roots/bud-support'),
    '../../../publish/template.html',
  ),
  ...(app.store.get('extension.htmlWebpackPlugin') ?? {}),
})

/**
 * Make plugin
 */
export const make = options =>
  new HtmlWebpackPlugin(options.all())

/**
 * Conditions
 */
export const when = ({store}) => store.isTrue('html')

/**
 * For interpolate-html-webpack-plugin
 */
export {HtmlWebpackPlugin}
