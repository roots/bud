import * as Webpack from 'webpack'

import {Items, Loaders, Rules, Service} from '../..'

/**
 * Build container service interface
 *
 * @remarks
 * Generates a compiler config from {@link (Framework:namespace).Rules}
 *
 * The most current config is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link (Framework:class).hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the webpack entry with `bud.hooks.filter('build/entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link (Framework:namespace).Loaders} interface
 *
 * - {@link Build.items} should be declared by augmenting the {@link (Framework:namespace).Items} interface
 *
 * - {@link Build.rules} should be declared by augmenting the {@link (Framework:namespace).Rules} interface
 *
 * @example
 * Access the config
 *
 * ```js
 * build.config
 * ```
 *
 * @example
 * Rebuild the configuration
 *
 * ```js
 * build.rebuild()
 * ```
 *
 * @example
 * Filter the Webpack configuration.entry value
 *
 * ```js
 * bud.hooks.filter('build/entry')
 * ```
 *
 * @public @core @container
 */
export default interface Build extends Service {
  /**
   * {@link Loader.Interface} array
   *
   * @public
   */
  loaders: Loaders

  /**
   * {@link Item.Interface} array
   *
   * @public
   */
  items: Items

  /**
   * {@link Rule.Interface} array
   *
   * @public
   */
  rules: Rules

  /**
   * Accesses the compiler configuration
   *
   * @public
   */
  config: Webpack.Configuration
}
