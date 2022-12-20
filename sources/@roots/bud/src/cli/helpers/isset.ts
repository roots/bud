import {isUndefined} from '@roots/bud-support/lodash-es'

/**
 * Returns true if the given value is neither null nor undefined.
 *
 * @public
 */
export const isset = (value: unknown): boolean => !isUndefined(value)
