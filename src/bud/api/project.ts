import {join} from 'path'
import type {Project} from './types'

const project: Project = function (relativePath: string): string {
  return join(this.state.paths.project, relativePath)
}

export {project}
