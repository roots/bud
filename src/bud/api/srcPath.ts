import {join} from 'path'
import type {Bud, PathSetter} from './types'

const srcPath: PathSetter = function (dir: string): Bud {
  this.state.paths.src = join(this.state.paths.project, dir)

  return this
}

export {srcPath}
