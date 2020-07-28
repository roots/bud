import type {Bud} from './Types'

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
const publicPath = function (dir: string): Bud {
  this.state.paths.public = dir

  return this
}

export {publicPath}
