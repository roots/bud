import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

/**
 * Handle {[key]: value} records
 */
export async function handleRecords(bud: Bud, input: Parameters) {
  const validation = await schema.records.safeParseAsync(input[0])
  if (!validation.success) handleTypeError(bud, `bud.alias`, validation)

  const aliases = await bud.hooks.filterAsync(`build.resolve.alias`, {
    '@src': bud.path(`@src`),
  })
  bud.hooks.async(`build.resolve.alias`, {...aliases, ...validation.data})

  return bud
}
