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
): bud {
  this.options.copy.patterns.push({from, to})

  return this
}

export {copy}

import {bud} from '..'
export type Copy = (from: string, to: string) => bud
