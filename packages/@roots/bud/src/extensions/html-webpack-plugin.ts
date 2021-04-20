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
export const options = (app: Framework) => ({
  alwaysWriteToDisk: true,
  base: app.subscribe('location/project'),
  inject: true,
  template: posix.resolve(
    require.resolve('@roots/bud-support'),
    '../../../publish/template.html',
  ),
})

/**
 * Make plugin
 */
export const make = options =>
  new HtmlWebpackPlugin(options.all())

/**
 * Conditions
 */
export const when = ({store, subscribe}) =>
  store.isTrue('html.enabled')
