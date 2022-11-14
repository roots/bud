import type {EntryObject} from '@roots/bud-framework/config'

export type {EntryObject}

export type Signifier = string

export type Parameters =
  | [Signifier]
  | [Array<Signifier>]
  | [Signifier, Signifier | Array<Signifier>]
  | [Record<Signifier, Signifier | Array<Signifier>>]
  | [Record<Signifier, EntryObject>]

export type RawValue = Signifier | Array<Signifier> | EntryObject

export type ObjectInput = Record<Signifier, Signifier | Array<Signifier>>

export type Records = {[signifier: string]: EntryObject}
