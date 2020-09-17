import BudInterface from '../Bud'

/**
 * ## bud.dist
 *
 * Returns an absolute path to the dist directory. Can be passed a string to get the absolute
 * path to a distributable file.
 *
 * ```js
 * bud.dist('scripts/app.js')
 * ```
 */
export interface Dist {
  (this: BudInterface, path?: string | undefined): string
}

const dist: Dist = function (path?: string) {
  return path
    ? this.fs.path.resolve(this.paths.get('dist'), path)
    : this.paths.get('dist')
}

export {dist as default}
