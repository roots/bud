import {Bud} from '@roots/bud-framework'
import isString from '@roots/bud-support/isString'

export type Parameters = [(`filesystem` | `memory` | boolean | Bud)?]

export interface persist {
  (...parameters: Parameters): Bud
}

export const persist: persist = function (this: Bud, type = `filesystem`) {
  if (type === false) {
    this.cache.enabled = false
    this.api.logger.log(`bud.cache:`, `disabled`)
    return this
  }

  this.cache.enabled = true
  this.api.logger.log(`bud.cache:`, `enabled`)

  if (isString(type)) {
    this.cache.type = type
    this.api.logger.log(`bud.cache:`, `set to`, type)
  }

  return this
}
