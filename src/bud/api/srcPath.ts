import {join} from 'path'
import type {Bud, PathSetter} from './types'

const srcPath: PathSetter = function (dir: string): Bud {
  const setPath = join(this.paths.get('project'), dir)

  this.paths.set('src', setPath)

  return this
}

export {srcPath}
