import {Bud} from '@roots/bud-framework'

export type Value =
  | ((hash: boolean | undefined) => boolean)
  | boolean
  | Bud
  | string

export type Parameters = [Value?]

export interface hash {
  (value: Value): Bud
}

export const hash: hash = function (this: Bud, value) {
  if (value instanceof Bud || value === undefined) {
    this.context.hash = true

    this.api.logger.success(`bud.hash: hash set to`, this.context.hash)

    return this
  }

  if (typeof value === `string`) {
    if (!value.startsWith(`[`)) value = `[${value}]`

    this.context.hash = true
    this.hooks.on(`value.hashFormat`, value)

    this.api.logger
      .success(`bud.hash: hash set to`, this.context.hash)
      .success(
        `bud.hash: hash format set to`,
        this.hooks.filter(`value.hashFormat`),
      )

    return this
  }

  this.context.hash = this.maybeCall(value, this.context.hash)

  this.api.logger.success(`bud.hash: hash set to`, this.context.hash)

  return this
}
