import {BudInterface} from '../Bud'

/**
 * ## bud.hash
 *
 * Enable or disable filename hashing of built assets.
 *
 * ```js
 * bud.hash(true)
 * ```
 */
export type Hash = (this: BudInterface) => BudInterface

const hash: Hash = function () {
  this.features.set('hash', true)

  return this
}

export {hash as default}
