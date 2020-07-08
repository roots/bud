import {join} from 'path'

/**
 * Yield an absolute path from a path relative to the src dir.
 * @example bud.src('scripts/app.js') // absolute path to the source file
 * @typedef {function (relativePath: string) => {absolutePath: string}} src
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
const src = function (relativePath) {
  return join(this.paths.src, relativePath)
}

export {src}
