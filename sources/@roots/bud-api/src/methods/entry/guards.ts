import type {
  EntryObject,
  Name,
  Parameters,
} from '@roots/bud-api/methods/entry'

export function isPrimitive(
  input: Parameters,
): input is [Array<string> | string] {
  return typeof input[0] === `string` || Array.isArray(input[0])
}

export function isNamed(
  input: Parameters,
): input is [string, Array<string> | string] {
  return input.length === 2
}

export function isNormalRecord(
  input: Parameters,
): input is [Record<Name, EntryObject>] {
  return (
    input.length === 1 &&
    typeof input[0] !== `string` &&
    !Array.isArray(input[0]) &&
    Object.values(input[0]).every(
      value => typeof value !== `string` && !Array.isArray(value),
    )
  )
}

export function isRecord(
  input: Parameters,
): input is [Record<string, Array<string> | string>] {
  return (
    input.length === 1 &&
    typeof input[0] !== `string` &&
    !Array.isArray(input[0]) &&
    Object.values(input[0]).every(
      value => typeof value === `string` || Array.isArray(value),
    )
  )
}

export function isObjectWithArrayValues(
  input: Record<string, Array<string> | EntryObject | string>,
): input is Record<string, Array<string>> {
  return Object.values(input).every(value => Array.isArray(value))
}

export function isObjectWithStringValues(
  input: Record<string, Array<string> | EntryObject | string>,
): input is Record<string, string> {
  return Object.values(input).every(value => typeof value === `string`)
}
