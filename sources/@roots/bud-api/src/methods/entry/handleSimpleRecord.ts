import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

export async function handleSimpleRecord(bud: Bud, input: Parameters) {
  const [value] = input
  const records = await schema.inputRecord.safeParseAsync(value)
  if (!records.success) handleTypeError(bud, `bud.entry`, records)

  const normalized = Object.entries(records.data).reduce(
    (entries, [signifier, item]) => ({
      ...(entries ?? {}),
      [signifier]: {
        import: Array.isArray(item) ? item : [item],
      },
    }),
    {},
  )

  const current = bud.hooks.filter(`build.entry`, {})
  bud.hooks.on(`build.entry`, {
    ...current,
    ...normalized,
  })

  return bud
}
