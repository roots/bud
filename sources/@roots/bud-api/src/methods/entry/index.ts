import type {Bud} from '@roots/bud-framework'
import type {EntryObject} from '@roots/bud-framework/config'

export type Name = string
export type Signifier = string

export type ImportValue = Array<Signifier> | Signifier
export type ObjectInput = Record<string, ImportValue>

export type Parameters =
  | [ImportValue]
  | [Name, EntryObject | ImportValue]
  | [Record<Name, EntryObject | ImportValue>]

export type Records = Record<string, EntryObject>

import isArray from '@roots/bud-support/lodash/isArray'
import isString from '@roots/bud-support/lodash/isString'

import {isNamed} from './guards.js'
import {handleNamed} from './handleNamed.js'
import {handlePrimitive} from './handlePrimitive.js'
import {handleRecords} from './handleRecords.js'

export interface entry {
  (...parameters: Parameters): Promise<Bud>
}

export const entry: entry = async function (this: Bud, ...input) {
  if (isNamed(input)) {
    const [name, value] = input
    return await handleNamed(this, name, value)
  }

  if (isString(input[0])) {
    const [value] = input
    return await handlePrimitive(this, value)
  }

  if (isArray(input[0])) {
    const [value] = input
    return await handlePrimitive(this, value)
  }

  const [records] = input
  return await handleRecords(this, records)
}

export type {EntryObject}
