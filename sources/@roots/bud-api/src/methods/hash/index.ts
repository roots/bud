import type {Bud} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'

export type Value =
  | ((hash?: boolean) => boolean | string)
  | boolean
  | Bud
  | string

export type Parameters = [Value?]

export interface hash {
  (value: Value): Bud
}

export const hash: hash = function (this: Bud, value = true) {
  if (typeof value === `boolean`) {
    return setHash(this, value)
  }

  if (value instanceof this.constructor) {
    return setHash(this, true)
  }

  if (typeof value === `function`) {
    value = value(this.context.hash)

    if (typeof value !== `boolean` && typeof value !== `string`)
      throw new InputError(`bud.hash: invalid input`, {
        details: `callbacks supplied to bud.hash should return a boolean or a string value`,
        docs: new URL(`https://bud.js.org/reference/bud.hash`),
        thrownBy: `@roots/bud-api/methods/hash`,
      })

    if (typeof value === `string`) {
      setHash(this, true)
      setFormat(this, value)
      return this
    }

    return setHash(this, value)
  }

  if (typeof value === `string`) {
    setHash(this, true)
    return setFormat(this, value)
  }

  throw new InputError(`bud.hash: invalid input`, {
    details: `bud.hash accepts a boolean, string, or callback function as input.`,
    docs: new URL(`https://bud.js.org/reference/bud.hash`),
    thrownBy: `@roots/bud-api/methods/hash`,
  })
}

const formatHashString = (value: string): string => {
  if (!value.startsWith(`[`)) value = `[${value}`
  if (!value.endsWith(`]`)) value = `${value}]`
  return value
}

const setFormat = (bud: Bud, value: string): Bud => {
  value = formatHashString(value)

  bud.hooks
    .on(`value.hashFormat`, value)
    .api.logger.success(`bud.hash: hash format set to`, value)

  return bud
}

const setHash = (bud: Bud, value: boolean): Bud => {
  bud.context.hash = value

  bud.api.logger.success(
    `bud.hash:`,
    `hash`,
    value ? `enabled` : `disabled`,
  )

  return bud
}
