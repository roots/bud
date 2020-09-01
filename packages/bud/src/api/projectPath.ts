import {Api} from '@roots/bud-typings'

const projectPath: Api.ProjectPath = function (dir) {
  this.paths.set('project', dir.replace(/\/^/g, ''))

  return this
}

export {projectPath}
