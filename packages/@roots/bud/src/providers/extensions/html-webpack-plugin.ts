import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'

/**
 * Name
 */
export const name = `html-webpack-plugin`

/**
 * Topics
 */
export const topics: Module['topics'] = [
  'extension/html-webpack-plugin/options/alwaysWriteToDisk',
  'extension/html-webpack-plugin/options/base',
  'extension/html-webpack-plugin/options/template',
  'extension/html-webpack-plugin/options/inject',
]

/**
 * Publishes
 */
export const publish: Module['publish'] = app => ({
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
export const options: Module.Options<HtmlWebpackPlugin.Options> = (
  app: Framework,
) => ({
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
export const make: Module.Make<
  HtmlWebpackPlugin,
  Module.Options<HtmlWebpackPlugin.Options>
> = options => new HtmlWebpackPlugin(options.all())

/**
 * Conditions
 */
export const when: Module.When = ({store, subscribe}) =>
  store.isTrue('options.html.enabled')
