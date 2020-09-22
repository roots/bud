import BudInterface from '../Bud'

/**
 * ## bud.copyAll
 *
 * Copy all files from a specified source to a specified destination.
 *
 * ```js
 * bud.copyAll(
 *  bud.src('images'),
 *  bud.dist('images')
 * )
 * ```
 */
export type CopyAll = (
  this: BudInterface,
  from: string,
  to: string,
) => BudInterface

const copyAll: CopyAll = function (from, to?) {
  this.options.set('plugins.copy.patterns', [
    ...this.options.get('plugins.copy.patterns'),
    this.hooks.filter('api.copyAll', {
      from: '**/*',
      context: from,
      to: to
        ? to
        : this.fs.path.join(this.paths.get('dist'), from),
      globOptions: {
        ignore: '.*',
      },
      noErrorOnMissing: true,
    }),
  ])

  return this
}

export {copyAll as default}
