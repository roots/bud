import {BudInterface} from '../'
import {Configuration} from 'webpack'

/**
 * ## bud.target
 *
 * Set the build target. Defaults to 'web'.
 *
 * ```js
 * bud.target('web')
 * ```
 */
export type Target = (
  this: BudInterface,
  target: Configuration['target'],
) => BudInterface

const target: Target = function (this: BudInterface, target) {
  this.options.set(
    'webpack.target',
    this.hooks.filter('api.target', target),
  )

  return this
}

export {target as default}
