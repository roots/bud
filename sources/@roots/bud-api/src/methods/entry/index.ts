import type {Bud} from '@roots/bud-framework'

import {
  isNormalRecord,
  isSimpleRecord,
  isSingleEntrypoint,
} from './guards.js'
import * as schema from './schema.js'
import type {Parameters} from './types.js'

export type {Parameters}

export interface entry {
  (...parameters: Parameters): Promise<Bud>
}

export const entry: entry = async function (this: Bud, ...input) {
  if (typeof input[0] === `string` && typeof input[1] === `string`) {
    const [signifierValue, importsValue] = input

    const signifier = await schema.entrypointSignifier.safeParseAsync(
      signifierValue,
    )
    if (!signifier.success) throw new Error()

    const imports = await schema.entrypointSignifier.safeParseAsync(
      importsValue,
    )
    if (!imports.success) throw new Error()

    const current = this.hooks.filter(`build.entry`, {})

    this.hooks.on(`build.entry`, {
      ...current,
      [signifier.data]: {import: [imports.data]},
    })

    return this
  }

  if (typeof input[0] === `string` && input.length === 1) {
    const [importsValue] = input
    const imports = await schema.entrypointSignifier.safeParseAsync(
      importsValue,
    )
    if (!imports.success) throw new Error()

    const current = this.hooks.filter(`build.entry`, {})

    this.hooks.on(`build.entry`, {
      ...current,
      [this.label]: {import: [imports.data]},
    })

    return this
  }

  if (Array.isArray(input[0]) && input.length === 1) {
    const [importsValue] = input
    const imports = await schema.importArray.safeParseAsync(importsValue)
    if (!imports.success) throw new Error()

    const current = this.hooks.filter(`build.entry`, {})

    this.hooks.on(`build.entry`, {
      ...current,
      [this.label]: {import: imports.data},
    })

    return this
  }

  if (typeof input[0] === `string` && Array.isArray(input[1])) {
    const [signifierValue, importsValue] = input
    const signifier = await schema.entrypointSignifier.safeParseAsync(
      signifierValue,
    )
    if (!signifier.success) throw new Error()

    const imports = await schema.importArray.safeParseAsync(importsValue)
    if (!imports.success) throw new Error()

    const current = this.hooks.filter(`build.entry`, {})

    this.hooks.on(`build.entry`, {
      ...current,
      [signifier.data]: {import: imports.data},
    })

    return this
  }

  if (isSingleEntrypoint(input)) {
    const [signifierValue, entryValue] = input
    const signifier = await schema.entrypointSignifier.safeParseAsync(
      signifierValue,
    )
    if (!signifier.success) throw new Error()

    const value = await schema.importValue.safeParseAsync(entryValue)
    if (!value.success) throw new Error()

    const current = this.hooks.filter(`build.entry`, {})

    this.hooks.on(`build.entry`, {
      ...current,
      [signifier.data]: {
        import: Array.isArray(value.data) ? value.data : [value.data],
      },
    })

    return this
  }

  if (isNormalRecord(input)) {
    const [value] = input
    const records = await schema.entrypointsRecord.safeParseAsync(value)
    if (!records.success) {
      this.api.logger.error(...records.error.format()._errors)
      this.api.logger.error(input)
      throw new Error()
    }

    const current = this.hooks.filter(`build.entry`, {})
    this.hooks.on(`build.entry`, {
      ...current,
      ...records.data,
    })

    return this
  }

  if (isSimpleRecord(input)) {
    const [value] = input
    const records = await schema.inputRecord.safeParseAsync(value)
    if (!records.success) throw new Error()

    const current = this.hooks.filter(`build.entry`, {})
    this.hooks.on(`build.entry`, {
      ...current,
      ...Object.entries(records.data).reduce(
        (entries, [signifier, item]) => ({
          ...(entries ?? {}),
          [signifier]: {
            import: Array.isArray(item) ? item : [item],
          },
        }),
        {},
      ),
    })

    return this
  }

  this.api.logger.success(`bud.entry: entrypoint(s) added`)
  return this
}
