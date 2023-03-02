import {join, parse} from 'node:path'

import type {Bud} from '@roots/bud-framework'

import {handleTypeError} from '../../errors/handleValidationTypeError.js'
import * as schema from './schema.js'
import type {EntryObject, Parameters} from './types.js'

export async function handlePrimitive(bud: Bud, input: Parameters) {
  const [value] = input

  const imports = Array.isArray(value)
    ? await schema.importArray.safeParseAsync(value)
    : await schema.entrypointSignifier.safeParseAsync(value)

  if (!imports.success) return handleTypeError(bud, `bud.entry`, imports)

  const current = bud.hooks.filter(`build.entry`, {}) as Record<
    string,
    EntryObject
  >

  const modules = Array.isArray(imports.data)
    ? imports.data
    : [imports.data]

  const {name, dir} = parse(modules[0])
  const key = join(dir, name)

  const definition = {
    ...(current?.[key] ?? {}),
    import: [...(current?.[key]?.import ?? []), ...modules],
  }

  bud.hooks.on(`build.entry`, {...current, [key]: definition})

  return bud
}
