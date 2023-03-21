import type {EntryObject} from '@roots/bud-framework/types/config'

export type {EntryObject}

export type Parameters =
  | [string]
  | [Array<string>]
  | [string, string | Array<string>]
  | [Record<string, string | Array<string>>]
  | [Record<string, EntryObject>]

export type RawValue = string | Array<string> | EntryObject

export type ObjectInput = Record<string, string | Array<string>>

export type Records = {[signifier: string]: EntryObject}
