import {join} from 'path'
import type {Dist} from './types'

const dist: Dist = function (path?: string): string {
  return path
    ? join(this.state.paths.dist, path)
    : this.state.paths.dist
}

export {dist}
