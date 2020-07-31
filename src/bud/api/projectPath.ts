import type {Bud, PathSetter} from './Types'

const projectPath: PathSetter = function (dir: string): Bud {
  this.paths.set('project', dir)

  return this
}

export {projectPath}
