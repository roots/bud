import {join} from 'path'

/**
 * ## bud.project
 *
 * Yield an absolute path from a path relative to the `bud.projectPath`.
 *
 * ### Example
 *
 * ```js
 * bud.project('package.json') // absolute path to package.json
 * ```
 *
 * @typedef {function (relativePath: string) => {absolutePath: string}} project
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
const project = function (relativePath) {
  return join(this.paths.project, relativePath)
}

export {project}
