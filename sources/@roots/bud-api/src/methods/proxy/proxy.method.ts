import type {Bud} from '@roots/bud-framework/bud'
import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isNumber from '@roots/bud-support/lodash/isNumber'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import {
  assignOptions,
  assignOptionsCallback,
  assignPort,
  assignReplacements,
  assignUrl,
  isFalse,
  isOptionsObject,
  isUrl,
  maybeEnable,
} from './helpers.js'
import type {Parameters} from './proxy.types.js'

/**
 * bud.proxy interface
 */
export interface proxy {
  (...params: Parameters): Promise<Bud>
}

/**
 * bud.proxy method
 */
export const proxy: proxy = async function (this: Bud, input, options) {
  // Bail early in production
  if (!this.isDevelopment) return this

  maybeEnable(this, input)

  if (isFalse(input) || isUndefined(input)) return this

  if (isString(input) || isUrl(input)) assignUrl(this, input)
  if (isNumber(input)) assignPort(this, input)
  if (isFunction(input)) assignOptionsCallback(this, input)
  if (isOptionsObject(input)) assignOptions(this, input)

  if (isArray(options) || isFunction(options))
    assignReplacements(this, options)
  if (isOptionsObject(options)) assignOptions(this, options)

  return this
}
