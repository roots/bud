import isNull from '@roots/bud-support/isNull'
import isUndefined from '@roots/bud-support/isUndefined'

/**
 * Returns true if the given value is neither null nor undefined.
 */
export const isset = (value: unknown): boolean =>
  !isNull(value) && !isUndefined(value)
