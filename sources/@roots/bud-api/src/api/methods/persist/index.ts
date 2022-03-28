import type {Framework} from '@roots/bud-framework'
import {chalk, lodash} from '@roots/bud-support'

const {isString} = lodash

export interface persist {
  (type?: 'memory' | 'filesystem' | false): Framework
}

export const persist: persist = function (
  type?: 'memory' | 'filesystem' | false,
) {
  const ctx = this as Framework

  if (type === false) {
    ctx.cache.enabled = false
    ctx.log({message: 'cache disabled'})
    return ctx
  }

  ctx.cache.enabled = true
  ctx.cache.type = isString(type) ? type : 'filesystem'

  ctx.log({
    message: 'cache enabled',
    suffix: chalk.dim(type),
  })

  return ctx
}
