import {join} from 'path'
import type {Bud, DistPath} from './types'

const distPath: DistPath = function (relativePath: string): Bud {
  this.state.paths.dist = join(this.state.paths.project, relativePath)

  return this
}

export {distPath}
