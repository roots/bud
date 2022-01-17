import * as Webpack from 'webpack'

import {Service} from '../../Service'
import * as Item from '../Item'
import * as Loader from '../Loader'
import * as Rule from '../Rule'

/**
 * Build container service interface
 *
 * @remarks
 * Most configuration values are run through {@link Hooks.filter} and {@link Hooks.promised} callbacks.
 *
 * @public
 */
export default abstract class Build extends Service {
  /**
   * {@link Build.loader} array
   *
   * @public
   */
  public loaders: Loader.Interface[]

  /**
   * {@link Build.item} array
   *
   * @public
   */
  public items: Item.Interface[]

  /**
   * {@link Build.rule} array
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
