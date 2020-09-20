import {BudInterface} from '../'

/**
 * ## bud.project
 *
 * Yield an absolute path from a path relative to the `bud.projectPath`.
 *
 * ```js
 * bud.project('package.json') // absolute path to package.json
 * ```
 */
export interface Project {
  (this: BudInterface, path?: string | undefined): string
}

const project: Project = function (path) {
  return path
    ? this.fs.path.join(this.paths.get('project'), path)
    : this.paths.get('project')
}

export {project as default}
