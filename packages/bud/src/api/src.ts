import {BudInterface} from '../'

/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative
 * to the directory assigned by `bud.srcPath`.
 *
 * ```js
 * bud.src('scripts/app.js')
 * ```
 */

export type Src = {
  (this: BudInterface, path?: string | undefined): string
}

const src: Src = function (path?: string): string {
  return path
    ? this.fs.path.resolve(this.paths.get('src'), path)
    : this.paths.get('src')
}

export {src as default}
