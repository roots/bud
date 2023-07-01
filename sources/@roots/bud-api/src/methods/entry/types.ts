import type {EntryObject} from '@roots/bud-framework/config'
export type {EntryObject}

export type Name = string
export type Signifier = string

export type ImportValue = Array<Signifier> | Signifier
export type ObjectInput = Record<string, ImportValue>

export type Parameters =
  | [ImportValue]
  | [Name, EntryObject | ImportValue]
  | [Record<Name, EntryObject | ImportValue>]

export type Records = Record<string, EntryObject>
