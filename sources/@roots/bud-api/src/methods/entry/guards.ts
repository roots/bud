import type {EntryObject, Parameters, Signifier} from './types.js'

export function isSingleEntrypoint(
  input: Parameters,
): input is [string, string | Array<string>] {
  return input.length === 2 && typeof input[0] === `string`
}

export function isNormalRecord(
  input: Parameters,
): input is [Record<Signifier, EntryObject>] {
  return (
    input.length === 1 &&
    typeof input[0] !== `string` &&
    !Array.isArray(input[0]) &&
    Object.values(input[0]).every(
      value => typeof value !== `string` && !Array.isArray(value),
    )
  )
}

export function isSimpleRecord(
  input: Parameters,
): input is [Record<Signifier, Signifier | Array<Signifier>>] {
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
  input: Record<string, string | Array<string> | EntryObject>,
): input is Record<string, Array<string>> {
  return Object.values(input).every(value => Array.isArray(value))
}

export function isObjectWithStringValues(
  input: Record<string, string | Array<string> | EntryObject>,
): input is Record<string, string> {
  return Object.values(input).every(value => typeof value === `string`)
}
