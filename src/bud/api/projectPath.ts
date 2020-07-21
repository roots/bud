/**
 * ## bud.projectPath
 *
 * Set the project base path.
 *
 * ```js
 * bud.projectPath(__dirname)
 * ```
 */
const projectPath = function (dir: string): bud {
  this.paths.project = dir

  return this
}

export {projectPath}
import type {bud} from '..'
