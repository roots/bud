import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from './handleTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

/**
 * Handle {[key]: value} records
 *
 * @public
 */
export async function handleRecords(bud: Bud, input: Parameters) {
  const validation = await schema.records.safeParseAsync(input[0])
  if (!validation.success) handleTypeError(bud, validation)

  const aliases = await bud.hooks.filterAsync(`build.resolve.alias`, {})
  bud.hooks.async(`build.resolve.alias`, {...aliases, ...validation.data})

  return bud
}
