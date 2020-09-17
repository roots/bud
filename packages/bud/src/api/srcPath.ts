import {BudInterface} from '../'

/**
 * ## bud.srcPath
 *
 * Set the project's src directory.
 *
 *  ```js
 * bud.srcPath('src')
 * ```
 */
export type SrcPath = (
  this: BudInterface,
  path: string,
) => BudInterface

const srcPath: SrcPath = function (
  this: BudInterface,
  segment: string,
): BudInterface {
  if (this.args.get('src')) {
    return this
  }

  this.paths.set(
    'src',
    this.fs.path.resolve(this.paths.get('project'), segment),
  )

  return this
}

export {srcPath as default}
