export const isString = (value: unknown): value is string =>
  typeof value === `string`

export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === `object`

export const isNumber = (value: unknown): value is number =>
  typeof value === `number`
