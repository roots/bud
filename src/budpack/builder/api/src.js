import {join} from 'path'

/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ### Example
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
const src = function (relativePath) {
  return join(this.paths.src, relativePath)
}

export {src}
