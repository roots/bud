import type {Bud} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'

import type {Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'

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
  throw new InputError(
    `bud.alias received invalid input: ${JSON.stringify(input, null, 2)}`,
  )
}
