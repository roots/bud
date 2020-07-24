import {join} from 'path'
import type {Bud} from './types'

/**
 * Set the project's dist directory.
 *
 * ```js
 * bud.distPath('dist')
 * ```
 */
const distPath = function (dir: string): Bud {
  this.state.paths.dist = join(
    this.state.paths.project,
    dir,
  )

  return this
}

export {distPath}
