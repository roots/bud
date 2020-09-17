import {BudInterface} from '../'

/**
 * ## bud.glob
 *
 * Compile assets into a particular directory.
 *
 * ```js
 * bud.bundlePath(
 *  bud.dist('scripts'),
 *  [bud.src('scripts')],
 * )
 * ```
 */
export type Glob = (
  this: BudInterface,
  output: string,
  files: string,
) => BudInterface

const glob: Glob = function (name, files) {
  this.options.merge(
    'webpack.entry',
    this.fs.glob
      .sync(files, {
        expandDirectories: true,
      })
      .map(file => ({
        ...this.options.get('webpack.entry'),
        [`${name}/`]: file,
      })),
  )

  return this
}

export {glob as default}
