import {BudInterface, Plugin} from '../'
import {isArray} from 'lodash'

/**
 * ## bud.extend
 *
 * Register a BudInterface plugin.
 *
 * ```js
 * bud.extend([require('@roots/bud-demo-plugin')])
 */
export type Extend = (
  this: BudInterface,
  plugins: Plugin[],
) => BudInterface

const extend: Extend = function (plugins) {
  if (!isArray(plugins)) {
    return
  }

  plugins.map(plugin =>
    this.makePluginController(plugin).build(),
  )

  return this
}

export {extend as default}
