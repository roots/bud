import type {Bud} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'

import type {Parameters} from './types.js'

import {handleCallback} from './handleCallback.js'
import {handleRecords} from './handleRecords.js'
import {handleSignifierValuePair} from './handleSignifierValuePair.js'
import {isCallback} from './isCallback.js'
import {isRecords} from './isRecords.js'
import {isSignifier} from './isSignifier.js'
import {isValue} from './isValue.js'

export type {Parameters}

export interface alias {
  (...parameters: Parameters): Bud
}

export const alias: alias = function (this: Bud, ...input) {
  if (isCallback(input[0])) {
    const [callback] = input
    return handleCallback(this, callback)
  }

  if (isRecords(input[0])) {
    const [records] = input
    return handleRecords(this, records)
  }

  if (!isSignifier(input[0]))
    throw new InputError(
      `bud.alias received invalid input. param[0] must be a string.`,
    )
  if (!isValue(input[1])) {
    throw new InputError(
      `bud.alias received invalid input. param[1] must be a string.`,
    )
  }

  const [signifier, value] = input
  return handleSignifierValuePair(this, signifier, value)
}
