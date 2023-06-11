import type {EntryObject} from '@roots/bud-framework/types/config'

export type {EntryObject}

export type Parameters =
  | [Array<string>]
  | [Record<string, Array<string> | string>]
  | [Record<string, EntryObject>]
  | [string, Array<string> | string]
  | [string]

export type RawValue = Array<string> | EntryObject | string

export type ObjectInput = Record<string, Array<string> | string>

export type Records = {[signifier: string]: EntryObject}
