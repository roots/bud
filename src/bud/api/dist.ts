import {join} from 'path'

/**
 * Yield an absolute path from a path relative to the dist dir.
 * ```js
 * bud.dist('scripts/app.js')
 * ```
 */
const dist = function (relativePath: string): string {
  return join(this.state.paths.dist, relativePath)
}

export {dist}
