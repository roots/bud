import {Service} from '../Service'
import {Loader} from './Loader'
import {Rule} from './Rule'
import {Item} from './Item'
import Webpack from 'webpack/types'

interface Build extends Service {
  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  config: Webpack.Configuration

  /**
   * Loaders
   */
  loaders: {[key: string]: Loader}

  /**
   * Items
   */
  items: {[key: string]: Item}

  /**
   * Rules
   */
  rules: {[key: string]: Rule}
}

export {Build}
