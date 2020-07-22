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
const copy: Copy = function (
  from: string,
  to: string,
): Bud {
  this.state.options.copy.patterns.push({from, to})

  return this
}

export {copy}
import type {Bud, Copy} from '.'
