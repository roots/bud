import type {Bud, PathSetter} from './types'

const projectPath: PathSetter = function (dir: string): Bud {
  this.paths.set('project', dir.replace(/\/^/g, ''))

  return this
}

export {projectPath}
