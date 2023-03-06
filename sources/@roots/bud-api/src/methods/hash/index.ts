import type {Bud} from '@roots/bud-framework'

export type Parameters = [
  (boolean | undefined | ((hash: boolean | undefined) => boolean))?,
]

export interface hash {
  (this: Bud, ...value: Parameters): Bud
}

export const hash: hash = function (
  this: Bud,
  value:
    | boolean
    | undefined
    | ((hash: boolean | undefined) => boolean) = true,
) {
  this.hooks.on(`feature.hash`, value)
  this.success(`file hashing ${value ? `enabled` : `disabled`}`)

  return this
}
