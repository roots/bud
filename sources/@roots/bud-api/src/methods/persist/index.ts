import type {Bud} from '@roots/bud-framework'
import {isString} from 'lodash-es'

export interface persist {
  (type?: 'memory' | 'filesystem' | false): Bud
}

export const persist: persist = function (
  type?: 'memory' | 'filesystem' | false,
) {
  const ctx = this as Bud

  if (type === false) {
    ctx.cache.enabled = false
    ctx.success(`cache disabled`)
    return ctx
  }

  ctx.cache.enabled = true
  ctx.cache.type = isString(type) ? type : ctx.cache.type

  ctx.success(`cache enabled`)

  return ctx
}
