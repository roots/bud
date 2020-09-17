import {BudInterface} from '../'

/**
 * ## bud.mini
 *
 * Enable or disable minification
 *
 * ```js
 * bud.mini(true)
 * ```
 */
export type Mini = (this: BudInterface) => BudInterface

const mini: Mini = function () {
  this.features.enable('minify')

  return this
}

export {mini as default}
