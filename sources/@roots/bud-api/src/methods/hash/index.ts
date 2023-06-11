import type {Bud} from '@roots/bud-framework'

export type Parameters = [
  (((hash: boolean | undefined) => boolean) | boolean | undefined)?,
]

export interface hash {
  (...value: Parameters): Bud
}

export const hash: hash = function (this: Bud, value = true) {
  this.context.hash = this.maybeCall(value, this.context.hash)
  this.success(`file hashing ${value ? `enabled` : `disabled`}`)

  return this
}
