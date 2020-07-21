/**
 * bud.target
 *
 * Set the build target.
 *
 * ```js
 * bud.target('web') // default
 * ```
 */
const target = function (target: string): bud {
  this.options.target = target

  return this
}

export {target}
import type {bud} from '..'
