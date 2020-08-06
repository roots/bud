import {join} from 'path'
import type {Project} from './types'

const project: Project = function (path: string): string {
  this.logger.info(
    {name: 'bud.api', function: 'bud.project', path},
    `bud.project called`,
  )

  return path ? join(this.paths.get('project'), path) : this.paths.get('project')
}

export {project}
