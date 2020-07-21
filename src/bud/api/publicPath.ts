/**
 * ## bud.publicPath
 *
 * Set the project public path.
 *
 * ### Example
 *
 * ```js
 * bud.publicPath('dist')
 * ```
 */
const publicPath = function (dir: string): bud {
  this.paths.public = dir

  return this
}

export {publicPath}
import type {bud} from '..'
