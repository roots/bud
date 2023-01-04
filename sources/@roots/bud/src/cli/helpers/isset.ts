import isNull from '@roots/bud-support/lodash/isNull'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Returns true if the given value is neither null nor undefined.
 *
 * @public
 */
export const isset = (value: unknown): boolean =>
  !isNull(value) && !isUndefined(value)
