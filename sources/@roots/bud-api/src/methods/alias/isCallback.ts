import type {Callback, Parameters} from './types.js'

/**
 * Type guard: isCallback
 */
export const isCallback = (value: Parameters): value is [Callback] => {
  return (
    typeof Array.isArray(value) &&
    value.length === 1 &&
    typeof value[0] === `function`
  )
}
