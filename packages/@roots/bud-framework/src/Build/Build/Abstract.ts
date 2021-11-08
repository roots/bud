import * as Webpack from 'webpack'

import {Service} from '../../Service'
import * as Item from '../Item'
import * as Loader from '../Loader'
import * as Rule from '../Rule'

/**
 * Build container service interface
 *
 * @remarks
 * The most current config is accessible through {@link @roots/bud-framework#Build | Build.config}.
 * If it has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link @roots/bud-framework#Build| Build.rebuild}
 * can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link @roots/bud-framework#(Hooks:interface) | Hooks}.
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
 * @public @core @container
 */
export default abstract class Build extends Service {
  /**
   * {@link Loader.Interface} array
   *
   * @public
   */
  public loaders: Loader.Interface[]

  /**
   * {@link Item.Interface} array
   *
   * @public
   */
  public items: Item.Interface[]

  /**
   * {@link Rule.Interface} array
   *
   * @public
   */
  public rules: Rule.Interface[]

  /**
   * Make the configuration object
   *
   * @public
   */
  public abstract make: () => Webpack.Configuration
}
