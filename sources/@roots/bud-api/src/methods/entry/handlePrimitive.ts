import type {Bud} from '@roots/bud-framework'

import {join, parse} from 'node:path'

import type {EntryObject, Parameters} from './types.js'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import {entrypointSignifier, importArray} from './schema.js'

export async function handlePrimitive(bud: Bud, input: Parameters) {
  const [value] = input

  const imports = Array.isArray(value)
    ? await importArray.safeParseAsync(value)
    : await entrypointSignifier.safeParseAsync(value)

  if (!imports.success) return handleTypeError(bud, `bud.entry`, imports)

  const current = bud.hooks.filter(`build.entry`, {}) as Record<
    string,
    EntryObject
  >

  const modules = Array.isArray(imports.data)
    ? imports.data
    : [imports.data]

  const {dir, name} = parse(modules[0])
  const key = join(dir, name)

  const definition = {
    ...(current?.[key] ?? {}),
    import: [...(current?.[key]?.import ?? []), ...modules],
  }

  bud.hooks.on(`build.entry`, {...current, [key]: definition})

  return bud
}
