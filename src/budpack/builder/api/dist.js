import {join} from 'path'

/**
 * Yield an absolute path from a path relative to the dist dir.
 * @example bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js
 * @typedef {function (relativePath: {string}) => {absolutePath: {string}}} dist
 * @param   {string} relativePath - relative path
 * @return  {string} absolute path
 */
const dist = function (relativePath) {
  return join(this.paths.dist, relativePath)
}

export {dist}
