import {Api} from '@roots/bud-typings'

export const projectPath: Api.ProjectPath = function (dir) {
  this.options.set('project', dir)

  return this
}
