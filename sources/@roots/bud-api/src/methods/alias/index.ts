import type {Bud} from '@roots/bud-framework'

import {handleCallback} from './handleCallback.js'
import {handleFallthrough} from './handleFallthrough.js'
import {handleRecords} from './handleRecords.js'
import {handleSignifierValuePair} from './handleSignifierValuePair.js'
import {isCallback} from './isCallback.js'
import {isRecords} from './isRecords.js'
import {isSignifierValuePair} from './isSignifierValuePair.js'
import type {Parameters} from './types.js'

export {Parameters}

export interface alias {
  (...parameters: Parameters): Promise<Bud>
}

export const alias: alias = async function (this: Bud, ...input) {
  if (isCallback(input)) {
    return await handleCallback(this, input)
  }

  if (isRecords(input)) {
    return await handleRecords(this, input)
  }

  if (isSignifierValuePair(input)) {
    return await handleSignifierValuePair(this, input)
  }

  return await handleFallthrough(this, input)
}
