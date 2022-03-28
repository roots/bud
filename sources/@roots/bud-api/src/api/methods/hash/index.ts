import type {Framework} from '@roots/bud-framework'

export interface hash {
  (this: Framework, enabled?: boolean): Framework
}

export const hash: hash = function (enabled = true) {
  this as Framework

  this.store.set('features.hash', enabled)

  this.log({
    message: `file hashing ${enabled ? 'enabled' : 'disabled'}`,
  })

  return this
}
