/**
 * ## bud.copy
 *
 * Copy a file.
 *
 * ```js
 * bud.copy(
 *   bud.src('images/image.png'),
 *   bud.dist('image.png'),
 * )
 * ```
 */
const copy = function (
  this: Bud,
  from: string,
  to: string,
): Bud {
  this.state.options.copy.patterns.push({from, to})

  return this
}

export {copy}
import {Bud} from '.'
