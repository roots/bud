import {join} from 'path'

/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 */
const src = function (relativePath: string): string {
  return join(this.paths.src, relativePath)
}

export {src}
