import type {Bud} from '@roots/bud-framework'

export type Parameters = [
  (boolean | undefined | ((hash: boolean | undefined) => boolean))?,
]

export interface hash {
  (...value: Parameters): Bud
}

export const hash: hash = function (this: Bud, value = true) {
  this.context.hash = this.maybeCall(value, this.context.hash)
  this.success(`file hashing ${value ? `enabled` : `disabled`}`)

  return this
}
