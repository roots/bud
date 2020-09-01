import {join} from 'path'
import {Api} from '@roots/bud-typings'

const project: Api.Project = function (path) {
  return path
    ? join(this.paths.get('project'), path)
    : this.paths.get('project')
}

export {project}
