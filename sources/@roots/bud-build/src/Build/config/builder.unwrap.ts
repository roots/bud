import type {Framework, Hooks} from '@roots/bud-framework'
import type {CompilerConfigCallables} from '@roots/bud-framework/store'
import {lodash} from '@roots/bud-support'

const {isUndefined} = lodash

/**
 * Unwrap initialValue
 *
 * @remarks
 * Returns the initializing value for a hook
 * If the value is available from {@link Framework.store}, the store value is used.
 * Otherwise, it will return the fallback value (if supplied)
 *
 * @param this - Application
 * @param key - store key
 * @param fallback - fallback value
 * @returns hook function
 *
 * @public
 */
export function unwrap<
  F extends keyof CompilerConfigCallables & keyof Hooks.Map & string,
>(
  this: Framework,
  key: F,
  fallback?: Hooks.Map[F] & CompilerConfigCallables[F],
) {
  return (
    value: CompilerConfigCallables[F] & Hooks.Map[F],
  ): CompilerConfigCallables[F] & Hooks.Map[F] => {
    const initValue = this.store.has(key)
      ? this.maybeCall(this.store.get(key))
      : value

    if (!isUndefined(initValue)) {
      return initValue as Hooks.Map[F]
    }

    if (!isUndefined(fallback)) {
      return fallback
    }

    return undefined
  }
}
