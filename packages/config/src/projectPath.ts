import Bud from '@roots/bud-types'

export const projectPath: Bud.Config.ProjectPath = function (
  dir,
) {
  this.store['paths'].set('project', dir.replace(/\/^/g, ''))

  return this
}
