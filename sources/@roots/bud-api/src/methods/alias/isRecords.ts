import type {Parameters, Records} from './types.js'

/**
 * Type guard: isObject
 */
export const isRecords = (value: Parameters): value is [Records] => {
  return (
    Array.isArray(value) &&
    typeof value[0] !== `string` &&
    !Array.isArray(value[0])
  )
}
