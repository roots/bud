import BudInterface from '../Bud'

/**
 * ## bud.bundle
 *
 * Compile a group of assets.
 *
 * ```js
 * bud.bundle('app', [
 *   bud.src('app.js'),
 *   bud.src('app.css'),
 * ])
 * ```
 */
export type Bundle = (
  this: BudInterface,
  name: string,
  entries: string[],
) => BudInterface

const bundle: Bundle = function (name, entries) {
  this.options.merge('webpack.entry', {
    ...this.hooks.filter('api.bundle.filter', {
      [name]: entries,
    }),
  })

  return this
}

export {bundle as default}
