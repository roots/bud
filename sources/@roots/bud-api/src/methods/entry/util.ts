import type {Bud, Config} from '@roots/bud-framework'
import {isArray, isString} from 'lodash-es'

export type EntryObject = Config.Entry.EntryObject

export type Input =
  | [string]
  | [Array<string>]
  | [string, string | Array<string>]
  | [Record<string, string | Array<string>>]
  | [Record<string, Config.Entry.EntryObject>]

export type RawValue =
  | string
  | Array<string>
  | {import: string | Array<string>}

export type NormalValue = {
  import: Array<string>
} & Config.Entry.EntryObject

export interface method {
  (...entrypoint: Input): Promise<Bud>
}

export interface facade {
  (...entrypoint: Input): Bud
}

/**
 * @internal
 */
const makeArray: (v: string | Array<string>) => Array<string> = v =>
  isString(v) ? [v] : v

/**
 * @internal
 */
const normalEntry = (entry: RawValue): NormalValue => {
  return isString(entry) || isArray(entry)
    ? {import: makeArray(entry)}
    : {...(entry ?? {}), import: makeArray(entry.import)}
}

/**
 * @public
 */
export const isGlobular = (str: string) =>
  ['*', '{', '}', ','].filter(c => str.includes(c))?.length > 0

/**
 * @public
 */
export const reduceEntry = (a, [k, v]) => ({...a, [k]: normalEntry(v)})

/**
 * @public
 */
export const makeEntry = (k: string, v: RawValue) => ({
  [k]: normalEntry(v),
})

/**
 * @public
 */
export const applyToImports = async (
  value: Record<string, NormalValue>,
  fn: (request: string) => Promise<string | Array<string>>,
): Promise<Array<[string, NormalValue]>> =>
  await Promise.all(
    Object.entries(value).map(async ([k, v]) => {
      v.import = (await Promise.all(v.import.map(fn))).flat()
      return [k, v]
    }),
  )
