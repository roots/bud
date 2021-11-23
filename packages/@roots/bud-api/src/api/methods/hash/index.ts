import type {Framework} from '@roots/bud-framework'

export interface hash {
  (this: Framework, enabled?: boolean): Framework
}

export const hash: hash = function (enabled = true) {
  this.store.set('features.hash', enabled)

  this.api.log('success', {
    message: `file hashing ${enabled ? 'enabled' : 'disabled'}`,
  })

  return this
}
