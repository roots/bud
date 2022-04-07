import type {Bud} from '@roots/bud-framework'
import {chalk, lodash} from '@roots/bud-support'

const {isString} = lodash

export interface persist {
  (type?: 'memory' | 'filesystem' | false): Bud
}

export const persist: persist = function (
  type?: 'memory' | 'filesystem' | false,
) {
  const ctx = this as Bud

  if (type === false) {
    ctx.cache.enabled = false
    ctx.api.log('success', {message: 'cache disabled'})
    return ctx
  }

  ctx.cache.enabled = true
  ctx.cache.type = isString(type) ? type : 'filesystem'

  ctx.api.log('success', {
    message: 'cache enabled',
    suffix: chalk.dim(type),
  })

  return ctx
}
