import {join} from 'path'
import type {Dist} from './types'

/**
 * ## bud.dist
 *
 * Yield an absolute path from a path relative to the dist dir.
 *
 * ```js
 * bud.dist('scripts/app.js')
 * ```
 */
const dist: Dist = function (relativePath: string): string {
  return join(this.state.paths.dist, relativePath)
}

export {dist}
