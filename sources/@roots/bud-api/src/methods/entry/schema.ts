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
export const importObject = z
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
export const importArray = z.array(importObject).nonempty({
  message: `imports array must not be empty`,
})

/**
 * entrypoints records
 */
export const inputRecord = z.record(
  entrypointSignifier,
  importObject.or(importArray),
)

/**
 * normalized entry record value
 *
 * @remarks how it should look after parsing
 */
export const normalEntryValue = z.object({
  asyncChunks: z.boolean().optional(),
  chunkLoading: z.string().optional(),
  dependOn: z.array(z.string()).optional(),
  filename: z.string().optional(),
  import: importArray,
  layer: z.string().optional(),
})

export const entrypointsRecord = z.record(
  entrypointSignifier,
  normalEntryValue,
)

/**
 * fn parameters
 */
export const parameters = z.union([
  z.tuple([entrypointSignifier, importObject.or(importArray)], {
    invalid_type_error: `invalid entrypoint`,
  }),
  entrypointsRecord,
  inputRecord,
  importObject.or(importArray),
])
