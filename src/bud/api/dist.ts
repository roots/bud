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
const dist: Dist = function (path?: string): string {
  return path
    ? join(this.state.paths.dist, path)
    : this.state.paths.dist
}

export {dist}
