import type {Framework} from '@roots/bud-framework'

/**
 * Hash function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - should filenames be hashed
 *
 * @public @config
 */
interface hash {
  (this: Framework, enabled?: boolean): Framework
}

/**
 * Enable filename hashing of built assets.
 *
 * @example
 * ```js
 * bud.hash()
 * ```
 *
 * @public @config
 */
const hash: hash = function (enabled = true) {
  this.store.set('hash', enabled)
  return this
}

export {hash as default}
