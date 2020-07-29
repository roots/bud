import type {Bud, PathSetter} from './Types'

const projectPath: PathSetter = function (dir: string): Bud {
  this.state.paths.project = dir

  return this
}

export {projectPath}
