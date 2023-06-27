import type {Bud} from '@roots/bud-framework'

import type {Parameters} from './types.js'

import {isNamed, isNormalRecord, isPrimitive} from './guards.js'
import {handleNamed} from './handleNamed.js'
import {handleNormalRecord} from './handleNormalRecord.js'
import {handlePrimitive} from './handlePrimitive.js'
import {handleSimpleRecord} from './handleSimpleRecord.js'

export type {Parameters}

export interface entry {
  (...parameters: Parameters): Promise<Bud>
}

export const entry: entry = async function (this: Bud, ...input) {
  if (isNamed(input)) return await handleNamed(this, input)
  if (isPrimitive(input)) return await handlePrimitive(this, input)

  await Promise.all(
    Object.entries(input[0]).map(async ([k, v]) => {
      return isNormalRecord([{[k]: v}])
        ? await handleNormalRecord(this, [{[k]: v}])
        : await handleSimpleRecord(this, [{[k]: v}])
    }),
  )

  return this
}
