import {join} from 'path'

/**
 * Yield an absolute path from a path relative to the project dir.
 * @example bud.project('package.json') // absolute path to package.json
 * @typedef {function (relativePath: string) => {absolutePath: string}} project
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
const project = function (relativePath) {
  return join(this.paths.project, relativePath)
}

export {project}
