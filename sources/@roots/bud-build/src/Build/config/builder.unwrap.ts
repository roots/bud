import type {Framework, Hooks} from '@roots/bud-framework'
import type {CompilerConfigCallables} from '@roots/bud-framework/store'
import {lodash} from '@roots/bud-support'

const {isUndefined} = lodash

/**
 * Unwrap
 *
 * @remarks
 * Unwraps a store value
 *
 * @param this - Application
 * @param key - store key
 * @param fallback - fallback value
 * @returns hook function
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
      return initValue
    }

    if (!isUndefined(fallback)) {
      return fallback
    }

    return undefined
  }
}
