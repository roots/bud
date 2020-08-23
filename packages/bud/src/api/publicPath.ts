import type {Bud, PathSetter} from './types'

const publicPath: PathSetter = function (dir: string): Bud {
  this.paths.set('public', dir)

  return this
}

export {publicPath}
