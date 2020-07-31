import {join} from 'path'
import type {Bud, PathSetter} from './types'

const srcPath: PathSetter = function (dir: string): Bud {
  const setPath = join(this.state.paths.get('project'), dir)

  this.state.paths.set('src', setPath)

  return this
}

export {srcPath}
