import {Service} from '../Service'
import {Loader} from './Loader'
import {Rule} from './Rule'
import {Item} from './Item'
import Webpack from 'webpack/types'

/**
 * ## Build
 *
 * Responsible for assembling the webpack config used
 * by the compiler.
 *
 * Access the config with `build.config`. It is
 * a dynamic getter and referencing the property
 * is equivalent to rebuilding the configuration
 * entirely.
 */
interface Build extends Service {
  /**
   * ## config
   *
   * Webpack configuration
   */
  config: Webpack.Configuration

  /**
   * ## loaders
   *
   * Loader registry
   */
  loaders: {[key: string]: Loader}

  /**
   * ## items
   *
   * RuleSetUse item registry
   */
  items: {[key: string]: Item}

  /**
   * ## rules
   *
   * Webpack rules registry
   */
  rules: {[key: string]: Rule}
}

export {Build}
