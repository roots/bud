import {join} from 'path'

/**
 * Set the project's dist directory.
 *
 * ```js
 * bud.distPath('dist')
 * ```
 */
const distPath = function (dir: string): bud {
  this.paths.dist = join(this.paths.project, dir)

  return this
}

export {distPath}
import type {bud} from '..'
