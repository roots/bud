import {join} from 'path'
import type {Bud, DistPath} from './types'

/**
 * Set the project's dist directory.
 *
 * ```js
 * bud.distPath('dist')
 * ```
 */
const distPath: DistPath = function (relativePath: string): Bud {
  this.state.paths.dist = join(
    this.state.paths.project,
    relativePath,
  )

  return this
}

export {distPath}
