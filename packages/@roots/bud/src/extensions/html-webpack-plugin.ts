import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Framework} from '@roots/bud-framework'

/**
 * Name
 */
export const name = `html-webpack-plugin`

/**
 * Publishes
 */
export const publish = app => ({
  ['extension/html-webpack-plugin/options/alwaysWriteToDisk']: () =>
    true,
  ['extension/html-webpack-plugin/options/base']: () =>
    app.subscribe('location/project', 'html-webpack-plugin'),
  ['extension/html-webpack-plugin/options/template']: () =>
    app.disk.path.posix.resolve(
      require.resolve('@roots/bud-support'),
      '../../../publish/template.html',
    ),
  ['extension/html-webpack-plugin/options/inject']: () => true,
})

/**
 * Options
 */
export const options = (app: Framework) => ({
  alwaysWriteToDisk: app.subscribe(
    'extension/html-webpack-plugin/options/alwaysWriteToDisk',
  ),
  inject: app.subscribe(
    'extension/html-webpack-plugin/options/inject',
  ),
  template: app.subscribe(
    'extension/html-webpack-plugin/options/template',
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
  store.isTrue('options.html.enabled')
