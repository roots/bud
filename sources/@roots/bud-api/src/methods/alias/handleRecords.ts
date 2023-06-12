import type {Bud} from '@roots/bud-framework'

import type {Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'

/**
 * Handle {[key]: value} records
 */
export async function handleRecords(bud: Bud, input: Parameters) {
  const validation = await schema.records.safeParseAsync(input[0])
  if (!validation.success) handleTypeError(bud, `bud.alias`, validation)

  bud.hooks.async(`build.resolve.alias`, async (paths = {}) => ({
    ...paths,
    ...validation.data,
  }))

  return bud
}
