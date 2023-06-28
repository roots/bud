import type {Bud} from '@roots/bud-framework'

import type {Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import {entrypointsRecord} from './schema.js'

export async function handleNormalRecord(bud: Bud, input: Parameters) {
  const [value] = input
  const records = await entrypointsRecord.safeParseAsync(value)
  if (!records.success) {
    return handleTypeError(bud, `bud.entry`, records)
  }

  const current = bud.hooks.filter(`build.entry`, {})
  const data = records.data

  bud.hooks.on(`build.entry`, {...current, ...data})

  return bud
}
