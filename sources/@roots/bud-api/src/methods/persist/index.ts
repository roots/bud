import type {Bud} from '@roots/bud-framework'
import isString from '@roots/bud-support/lodash/isString'

export type Parameters = [(`memory` | `filesystem` | boolean)?]

export interface persist {
  (...parameters: Parameters): Bud
}

export const persist: persist = function (this: Bud, type = `filesystem`) {
  if (type === false) {
    this.cache.enabled = false
    this.success(`cache disabled`)
    return this
  }

  this.cache.enabled = true
  this.cache.type = isString(type) ? type : `filesystem`

  this.success(`cache enabled`)

  return this
}
