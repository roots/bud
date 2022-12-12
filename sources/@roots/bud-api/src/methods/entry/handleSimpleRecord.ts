import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import {normalizeRecord} from './normalize.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

export async function handleSimpleRecord(bud: Bud, input: Parameters) {
  const [value] = input
  const records = await schema.inputRecord.safeParseAsync(value)
  if (!records.success) handleTypeError(bud, `bud.entry`, records)

  const current = bud.hooks.filter(`build.entry`, {})

  bud.hooks.on(`build.entry`, {
    ...current,
    ...normalizeRecord(records.data),
  })

  return bud
}
