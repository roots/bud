import {BudInterface} from '../Bud'

/**
 * ## bud.distPath
 *
 * Set the project's dist directory.
 *
 *  ```js
 * bud.distPath('dist')
 * ```
 */
export type ProjectPath = (
  this: BudInterface,
  path: string,
) => BudInterface

const projectPath: ProjectPath = function (dir) {
  this.paths.set('project', dir.replace(/\/^/g, ''))
  this.updateDisk()

  return this
}

export {projectPath as default}
