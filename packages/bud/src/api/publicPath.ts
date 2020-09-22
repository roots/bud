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
  this.paths.set('public', dir)
  this.options.set('webpack.publicPath', dir)

  return this
}

export {publicPath as default}
