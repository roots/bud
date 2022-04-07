import type {Bud} from '@roots/bud-framework'

export interface hash {
  (this: Bud, enabled?: boolean): Bud
}

export const hash: hash = function (enabled = true) {
  this as Bud

  this.store.set('features.hash', enabled)

  this.api.log('success', {
    message: `file hashing ${enabled ? 'enabled' : 'disabled'}`,
  })

  return this
}
