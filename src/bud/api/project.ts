import {join} from 'path'

/**
 * ## bud.project
 *
 * Yield an absolute path from a path relative to the `bud.projectPath`.
 *
 * ```js
 * bud.project('package.json') // absolute path to package.json
 * ```
 */
const project = function (relativePath: string): string {
  return join(this.paths.project, relativePath)
}

export {project}
