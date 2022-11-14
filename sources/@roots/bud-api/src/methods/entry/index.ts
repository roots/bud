import type {Bud} from '@roots/bud-framework'

import {isNamed, isNormalRecord, isPrimitive, isRecord} from './guards.js'
import {handleNamed} from './handleNamed.js'
import {handleNormalRecord} from './handleNormalRecord.js'
import {handlePrimitive} from './handlePrimitive.js'
import {handleSimpleRecord} from './handleSimpleRecord.js'
import type {Parameters} from './types.js'

export type {Parameters}

export interface entry {
  (...parameters: Parameters): Promise<Bud>
}

export const entry: entry = async function (this: Bud, ...input) {
  if (isNamed(input)) {
    return await handleNamed(this, input)
  }

  if (isPrimitive(input)) {
    return await handlePrimitive(this, input)
  }

  if (isNormalRecord(input)) {
    return await handleNormalRecord(this, input)
  }

  if (isRecord(input)) {
    return await handleSimpleRecord(this, input)
  }

  this.api.logger.success(`bud.entry: entrypoint(s) added`)
  return this
}
