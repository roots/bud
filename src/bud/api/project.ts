import {join} from 'path'
import type {Project} from './types'

const project: Project = function (path: string): string {
  return path
    ? join(this.state.paths.get('project'), path)
    : this.state.paths.get('project')
}

export {project}
