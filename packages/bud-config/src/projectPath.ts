import Bud from '@roots/bud-types'

export const projectPath: Bud.Config.ProjectPath = function (
  dir,
) {
  this.paths.set('project', dir.replace(/\/^/g, ''))
  this.updateDisk()

  return this
}
