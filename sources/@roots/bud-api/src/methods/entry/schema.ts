import {z} from '@roots/bud-support/zod'

const docs = `usage docs: https://bud.js.org/docs/bud.entry`

/**
 * Entrypoint signifier
 */
export const entrypointSignifier = z
  .string()
  .min(1, {message: `signifier must not be a blank string. ${docs}`})

/**
 * `import` key value
 */
export const importItem = z
  .string()
  .min(1, {message: `value must not be a blank string. ${docs}`})

/**
 * `import` array
 */
export const importArray = z.array(importItem).nonempty()

/**
 * simple import value
 *
 * @remarks union of {@link importItem} and {@link importArray}
 */
export const importValue = z.union([importItem, importArray])

/**
 * entrypoints records
 */
export const inputRecord = z.record(entrypointSignifier, importValue)

/**
 * normalized entry record value
 *
 * @remarks how it should look after parsing
 */
export const normalEntryValue = z.object({
  import: importArray,
  dependsOn: z.array(z.string()).optional(),
})

export const entrypointsRecord = z.record(
  entrypointSignifier,
  normalEntryValue,
)

/**
 * parameters
 */
export const parameters = z.union([
  z.tuple([entrypointSignifier, importValue]),
  z.tuple([entrypointSignifier, importArray]),
  entrypointsRecord,
  importValue,
  importArray,
])
