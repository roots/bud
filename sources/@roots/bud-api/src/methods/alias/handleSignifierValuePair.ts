import type {Bud} from '@roots/bud-framework'

import type {Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'

/**
 * Handle [string, string] values
 */
export async function handleSignifierValuePair(
  bud: Bud,
  input: Parameters,
) {
  const signifier = await getParameter(bud, input, 0)
  const value = await getParameter(bud, input, 1)

  bud.hooks.async(`build.resolve.alias`, async (paths = {}) => ({
    ...paths,
    [signifier]: value,
  }))

  return bud
}

async function getParameter(
  bud: Bud,
  parameters: Parameters,
  index: keyof Parameters,
) {
  const validation = await schema.signifier.safeParseAsync(
    parameters[index],
  )
  if (!validation.success)
    return handleTypeError(bud, `bud.alias`, validation)
  return validation.data
}
