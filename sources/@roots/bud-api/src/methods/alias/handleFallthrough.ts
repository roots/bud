import type {Bud} from '@roots/bud-framework'

import {handleFallthroughError} from '../../errors/handleFallthroughError.js'
import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

/**
 * Handle fallthrough
 */
export async function handleFallthrough(
  bud: Bud,
  input: Parameters,
): Promise<never> {
  const validation = await schema.parameters.safeParseAsync(input)
  if (!validation.success)
    return handleTypeError(bud, `bud.alias`, validation)

  // this should never be called
  return handleFallthroughError(bud, `bud.alias`)
}
