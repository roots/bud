import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from './handleTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

/**
 * Handle fallthrough
 *
 * @public
 */
export async function handleFallthrough(
  bud: Bud,
  input: Parameters,
): Promise<never> {
  const validation = await schema.parameters.safeParseAsync(input)
  if (!validation.success) return handleTypeError(bud, validation)

  // this should never be called
  bud.api.logger.error(`unknown error in bud.alias`)
  throw new Error()
}
