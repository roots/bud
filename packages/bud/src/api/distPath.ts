import {BudInterface} from '../'

/**
 * ## bud.distPath
 *
 * Set the project's dist directory.
 *
 *  ```js
 * bud.distPath('dist')
 * ```
 */
export type DistPath = (
  this: BudInterface,
  path: string,
) => BudInterface

const distPath: DistPath = function (segment: string) {
  /**
   * If set, CLI arguments take precendence over dist in config.
   */
  !this.args.get('dist') &&
    this.paths.set(
      'dist',
      this.hooks.filter(
        'api.distPath',
        this.fs.path.resolve(this.paths.get('project'), segment),
      ),
    )

  /**
   * Update the disk
   */
  this.diskRefresh()

  return this
}

export {distPath as default}
