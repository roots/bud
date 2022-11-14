import type {Parameters, Signifier, Value} from './types.js'

/**
 * Type guard: isSignifierValuePair
 *
 * @public
 */
export const isSignifierValuePair = (
  value: Parameters,
): value is [Signifier, Value] => {
  return (
    Array.isArray(value) &&
    typeof value[0] === `string` &&
    value.length === 2
  )
}
