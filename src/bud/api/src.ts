import {join} from 'path'
import type {Src} from './types'

const src: Src = function (path?: string): string {
  return path
    ? join(this.paths.get('src'), path)
    : this.paths.get('src')
}

export {src}
