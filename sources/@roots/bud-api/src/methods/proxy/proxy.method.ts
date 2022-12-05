import type {Bud} from '@roots/bud-framework/bud'
import {
  isArray,
  isFunction,
  isNumber,
  isString,
  isUndefined,
} from '@roots/bud-support/lodash-es'

import {
  assignOptions,
  assignOptionsFunction,
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
 *
 * @public
 */
export interface proxy {
  (...params: Parameters): Promise<Bud>
}

/**
 * bud.proxy method
 *
 * @public
 */
export const proxy: proxy = async function (this: Bud, input, options) {
  // Bail early in production
  if (!this.isDevelopment) return this

  maybeEnable(this, input)

  if (isFalse(input) || isUndefined(input)) return this

  if (isString(input) || isUrl(input)) assignUrl(this, input)
  if (isNumber(input)) assignPort(this, input)
  if (isFunction(input)) assignOptionsFunction(this, input)
  if (isOptionsObject(input)) assignOptions(this, input)

  if (isArray(options) || isFunction(options))
    assignReplacements(this, options)
  if (isOptionsObject(options)) assignOptions(this, options)

  return this
}
