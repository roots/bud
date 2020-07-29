import {join} from 'path'
import type {Bud, PathSetter} from './types'

const distPath: PathSetter = function (dir: string): Bud {
  this.state.paths.dist = join(this.state.paths.project, dir)

  return this
}

export {distPath}
