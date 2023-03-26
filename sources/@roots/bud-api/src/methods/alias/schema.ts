import {z} from '@roots/bud-support/zod'

/**
 * Alias signifier
 */
export const signifier = z
  .string()
  .min(1, {message: `signifier must not be a blank string`})

/**
 * Alias value
 */
export const item = z
  .string()
  .min(1, {message: `value must not be a blank string`})

/**
 * Alias value
 */
export const disabled = z.literal(false)

/**
 * Alias value
 */
export const arrayed = z.array(item)

/**
 * Alias values
 *
 * @remarks either a {@link String} {@link Array} or `false`
 */
export const value = z.union([item, arrayed, disabled])

/**
 * Alias records
 *
 * @remarks values keyed to {@link signifier} keys
 */
export const records = z.record(signifier, value)

/**
 * Alias callback
 *
 * @remarks
 * a function that accepts {@link records} and returns {@link records}
 * the {@link records} value received by the function may be `undefined`
 */
export const callback = z
  .function()
  .args(records.optional())
  .returns(z.promise(records))

/**
 * parameters
 *
 * @remarks either a paired {@link signifier} {@link records} object or a {@link Callback} function
 */
export const parameters = z
  .union([
    z.tuple([signifier, value]),
    z.tuple([callback]),
    z.tuple([records]),
  ])
  .refine(arr => arr.length < 3, {
    message: `accepts a maximum of two parameters`,
  })
