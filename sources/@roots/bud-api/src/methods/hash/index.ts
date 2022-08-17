import type {Bud} from '@roots/bud-framework'

export interface hash {
  (this: Bud, enabled?: boolean): Bud
}

export const hash: hash = function (enabled = true) {
  this as Bud

  this.hooks.on(`feature.hash`, enabled)

  this.success({
    message: `file hashing ${enabled ? `enabled` : `disabled`}`,
  })

  return this
}
