import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

export async function handleNamed(bud: Bud, input: Parameters) {
  const [key, value] = input

  const signifier = await schema.entrypointSignifier.safeParseAsync(key)
  if (!signifier.success)
    return handleTypeError(bud, `bud.entry`, signifier)

  const imports = Array.isArray(value)
    ? await schema.importArray.safeParseAsync(value)
    : await schema.importItem.safeParseAsync(value)

  if (!imports.success) return handleTypeError(bud, `bud.entry`, imports)

  const current = bud.hooks.filter(`build.entry`, {})
  bud.hooks.on(`build.entry`, {
    ...current,
    [signifier.data]: {
      import: Array.isArray(imports.data) ? imports.data : [imports.data],
    },
  })

  return bud
}
