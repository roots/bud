import {BudInterface} from '../'

/**
 * ## bud.publicPath
 *
 * Set the project's public directory.
 *
 *  ```js
 * bud.publicPath('public')
 * ```
 */
export type PublicPath = (
  this: BudInterface,
  path: string,
) => BudInterface

const publicPath: PublicPath = function (dir: string) {
  /**
   * @todo this sucks and is unnecessary
   */
  dir = !dir.match(/\/$/g) ? `${dir}/` : dir
  dir = !dir.match(/\/^/g) ? `/${dir}` : dir

  this.paths.set('public', dir)

  return this
}

export {publicPath as default}
