import {Config} from '..'

export const projectPath: Config.ProjectPath = function (dir) {
  this.store['paths'].set('project', dir.replace(/\/^/g, ''))

  return this
}
