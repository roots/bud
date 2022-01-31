import type {Framework} from '@roots/bud-framework'
import {MiddlewareMap} from '@roots/bud-framework/src/Server'
import {lodash} from '@roots/bud-support'
import {isBoolean, isString, isUndefined} from 'lodash'
import {URL} from 'url'

const {isNumber} = lodash

type Target = URL | string | boolean | number

export interface method {
  (config?: Target): Framework
}

export type facade = method

export const enableMiddleware = (
  middleware: Array<keyof MiddlewareMap>,
) => {
  !middleware.includes('proxy') && middleware.push('proxy')
  return middleware
}

export const disableMiddleware = (
  middleware: Array<keyof MiddlewareMap>,
) => {
  middleware.includes('proxy') &&
    delete middleware[middleware.findIndex(i => i === 'proxy')]

  return middleware
}

export const method: method = function (target) {
  const ctx = this as Framework

  if (isUndefined(target)) {
    return ctx
      .log('log', 'enabling proxy')
      .hooks.on('middleware.enabled', enableMiddleware)
  }

  if (isBoolean(target)) {
    return ctx
      .log('enabling')
      .hooks.on(
        'middleware.enabled',
        target ? enableMiddleware : disableMiddleware,
      )
  }

  if (isNumber(target)) {
    return ctx.hooks.on('middleware.proxy.target', hookValue => {
      hookValue.port = `${target}`
      return hookValue
    })
  }

  if (isString(target)) {
    return ctx.hooks.on('middleware.proxy.target', () => new URL(target))
  }

  if (target instanceof URL) {
    return ctx.hooks.on('middleware.proxy.target', () => target)
  }

  ctx.hooks
    .log('log', 'enabling proxy')
    .on('middleware.enabled', enableMiddleware)
}
