import {BudInterface} from '../'

/**
 * Remove extension from path-like string
 */
const basedName = function (
  this: BudInterface,
  file: string,
): string {
  const ext = `.${file.split('.').pop()}`
  return this.fs.path.basename(file, ext)
}

/**
 * Prepare param for use with globbing function
 * @see BudInterface.fs.glob
 */
const prepareGlobObject = function (
  this: BudInterface,
  search: string | string[],
): string[] {
  switch (typeof search) {
    case 'string':
      return [this.src(search)]
    case 'object':
      return search.map(file => this.src(file))
  }
}

/**
 * ## bud.glob
 *
 * Compile assets into a particular directory.
 *
 * Accepts glob as an array:
 *
 * ```js
 * bud.glob(
 *   'app',
 *   ['*.js', '*.css'],
 * )
 * ```
 *
 * Accepts a string:
 *
 * ```js
 * bud.glob(
 *   'app',
 *   '*.js',
 * )
 * ```
 *
 * Pass additional options with the third parameter. See
 * globby documentation for more information.
 *
 * ```js
 * bud.glob('app', '*.js', {expandDirectories: true})
 * ```
 */
export type Glob = (
  this: BudInterface,
  name: string,
  files: string | string[],
  options: {[key: string]: any},
) => BudInterface

const glob: Glob = function (
  this: BudInterface,
  name: string,
  files: string | string[],
  options = {expandDirectories: true},
): BudInterface {
  /**
   * Prep and run glob op.
   */
  const glob = prepareGlobObject.bind(this)(files)
  const results = this.fs.glob.sync(glob, options)

  /**
   * Merge results onto webpack entries.
   */
  this.options.merge(
    'webpack.entry',
    results.reduce(
      (acc, curr) => ({
        ...acc,
        [`${name}/${basedName.bind(this)(curr)}`]: curr,
      }),
      {},
    ),
  )

  return this
}

export {glob as default}
