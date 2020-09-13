import {Api} from '@roots/bud-types'

const projectPath: Api.ProjectPath = function (dir) {
  this.paths.set('project', dir.replace(/\/^/g, ''))

  /**
   * Update the disk
   */
  this.fs.refresh()

  return this
}

export {projectPath}
