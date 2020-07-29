import type {Bud, PathSetter} from './Types'

const publicPath: PathSetter = function (dir: string): Bud {
  this.state.paths.public = dir

  return this
}

export {publicPath}
