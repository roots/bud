import type {Bud} from '@roots/bud-framework'

import type {Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import {entrypointSignifier, importArray, importObject} from './schema.js'

export async function handleNamed(bud: Bud, input: Parameters) {
  const [key, value] = input

  const signifier = await entrypointSignifier.safeParseAsync(key)
  if (!signifier.success)
    return handleTypeError(bud, `bud.entry`, signifier)

  const imports = Array.isArray(value)
    ? await importArray.safeParseAsync(value)
    : await importObject.safeParseAsync(value)

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
