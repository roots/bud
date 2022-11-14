import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from './handleTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

/**
 * @public
 */
export async function handleCallback(bud: Bud, input: Parameters) {
  const validation = await schema.callback.safeParseAsync(input[0])
  if (!validation.success) return handleTypeError(bud, validation)

  bud.hooks.async(`build.resolve.alias`, validation.data)

  return bud
}
