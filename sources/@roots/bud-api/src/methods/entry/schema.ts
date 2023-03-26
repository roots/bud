import {z, ZodIssueCode} from '@roots/bud-support/zod'

/**
 * Entrypoint signifier
 */
export const entrypointSignifier = z
  .string({
    errorMap: (error, ctx) => {
      switch (error.code) {
        case ZodIssueCode.invalid_type:
          return {
            message: `entrypoint signifier must be a string`,
          }
        default:
          return {message: ctx.defaultError}
      }
    },
  })
  .min(1, {message: `signifier must not be a blank string`})

/**
 * `import` key value
 */
export const importItem = z
  .string({
    errorMap: (error, ctx) => {
      switch (error.code) {
        case ZodIssueCode.invalid_type:
          return {
            message: `import item must be a string`,
          }
        default:
          return {message: ctx.defaultError}
      }
    },
  })
  .min(1, {message: `imports cannot be a blank string`})

/**
 * `import` array
 */
export const importArray = z.array(importItem).nonempty({
  message: `imports array must not be empty`,
})

/**
 * entrypoints records
 */
export const inputRecord = z.record(
  entrypointSignifier,
  importItem.or(importArray),
)

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
 * fn parameters
 */
export const parameters = z.union([
  z.tuple([entrypointSignifier, importItem.or(importArray)], {
    invalid_type_error: `invalid entrypoint`,
  }),
  entrypointsRecord,
  inputRecord,
  importItem.or(importArray),
])
