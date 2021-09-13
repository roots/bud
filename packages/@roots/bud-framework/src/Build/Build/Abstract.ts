import * as Webpack from 'webpack'

import {Service} from '../../Service'
import * as Item from '../Item'
import * as Loader from '../Loader'
import * as Rule from '../Rule'

/**
 * Build container service interface
 *
 * @remarks
 * The most current config is accessible through {@link Build.config}. If it
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link Framework.hooks} callbacks.
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
export default class Build extends Service {
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
   * Accesses the compiler configuration
   *
   * @public
   */
  public config: Webpack.Configuration
}
