import {join} from 'path'

/**
 * Set the project's dist directory.
 *
 * ```js
 * bud.distPath('dist')
 * ```
 */
const distPath = function (dir: string): Bud {
  this.state.paths.dist = join(this.state.paths.project, dir)

  return this
}

export {distPath}
import type {Bud} from '..'