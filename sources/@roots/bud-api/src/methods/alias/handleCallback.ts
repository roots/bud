import type {Bud} from '@roots/bud-framework'

import type {Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'

export async function handleCallback(bud: Bud, input: Parameters) {
  const validation = await schema.callback.safeParseAsync(input[0])
  if (!validation.success)
    return handleTypeError(bud, `bud.alias`, validation)

  bud.hooks.async(`build.resolve.alias`, validation.data)

  return bud
}
