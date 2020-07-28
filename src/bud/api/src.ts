import {join} from 'path'
import type {Src} from './types'

const src: Src = function (path?: string): string {
  return path
    ? join(this.state.paths.src, path)
    : this.state.paths.src
}

export {src}
