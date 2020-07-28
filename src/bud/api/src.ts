import {join} from 'path'
import type {Src} from './types'

/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 */
const src: Src = function (path?: string): string {
  return path
    ? join(this.state.paths.src, path)
    : this.state.paths.src
}

export {src}
