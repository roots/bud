import {Api} from '@roots/bud-typings'

export const projectPath: Api.ProjectPath = function (dir) {
  this.disk.get('project').setBase(dir)
  this.fs.setBase(dir)

  return this
}
