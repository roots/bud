import {join} from 'path'
import type {Dist} from './types'

const dist: Dist = function (path?: string): string {
  return path
    ? join(this.paths.get('dist'), path)
    : this.paths.get('dist')
}

export {dist}
