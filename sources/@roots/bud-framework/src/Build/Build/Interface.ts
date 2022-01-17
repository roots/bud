import * as Webpack from 'webpack'

import {Items, Loaders, Rules, Service} from '../..'
import * as Rule from '../Rule'

/**
 * Build container service interface
 *
 * @remarks
 * Generates a compiler config from {@link Build.rules}
 *
 * The most current config is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link Hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the webpack entry with `bud.hooks.filter('build.entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link Build.loaders} interface
 *
 * - {@link Build.items} should be declared by augmenting the {@link Framework.Items} interface
 *
 * - {@link Build.rules} should be declared by augmenting the {@link Framework.Rules} interface
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
 * bud.hooks.filter('build.entry')
 * ```
 *
 * @public
 */
export default interface Build extends Service {
  /**
   * {@link Build.loader} array
   *
   * @public
   */
  loaders: Loaders

  /**
   * {@link Build.item} array
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

  /**
   * Make the configuration object
   *
   * @public
   */
  make(): Promise<Webpack.Configuration>

  /**
   * Set a rule
   *
   * @public
   */
  setRule(
    name: string,
    constructorProperties?: Partial<Rule.Options>,
  ): Rule.Interface

  /**
   * Make a new rule
   *
   * @public
   */
  makeRule(constructorProperties?: Partial<Rule.Options>): Rule.Interface
}
