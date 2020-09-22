import {BudInterface} from '..'

/**
 * ## bud.mini
 *
 * Enable or disable minification
 *
 * ```js
 * bud.mini(true)
 * ```
 */
export type Minify = (this: BudInterface) => BudInterface

const minify: Minify = function () {
  this.features.enable('minify')

  return this
}

export {minify as default}
