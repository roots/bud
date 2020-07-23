/**
 * bud.target
 *
 * Set the build target.
 *
 * ```js
 * bud.target('web') // default
 * ```
 */
const target = function (target: string): Bud {
  this.state.options.target = target

  return this
}

export {target}
import type {Bud} from '..'
