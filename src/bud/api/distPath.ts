import {join} from 'path'
import type {Bud, PathSetter} from './types'

const distPath: PathSetter = function (dir: string): Bud {
  this.paths.set(
    'dist',
    join(this.paths.get('project'), dir),
  )

  return this
}

export {distPath}
