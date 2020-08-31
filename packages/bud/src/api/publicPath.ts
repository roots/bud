import type {Bud, PathSetter} from './types'

const publicPath: PathSetter = function (dir: string): Bud {
  dir = !dir.match(/\/$/g) ? `${dir}/` : dir
  dir = !dir.match(/\/^/g) ? `/${dir}` : dir

  this.paths.set('public', dir)

  return this
}

export {publicPath}
