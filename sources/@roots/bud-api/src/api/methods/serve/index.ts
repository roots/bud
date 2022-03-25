import type {Framework} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/src/Server'
import {lodash} from '@roots/bud-support'

const {isFunction} = lodash

export interface method {
  (
    url: URL | string,
    options?:
      | Connection.Options
      | ((options: Connection.Options) => Connection.Options),
  ): Framework
}

export type facade = method

export const method: method = function (input, options?) {
  const app = this as Framework

  if (!app.isDevelopment) return app

  if (options) {
    const unwrapped = isFunction(options)
      ? options(app.hooks.filter('dev.options') ?? {})
      : options

    app.hooks.on('dev.options', value =>
      value ? {...value, ...unwrapped} : unwrapped,
    )
  }

  if (typeof input === 'string') {
    return app.hooks.on('dev.url', new URL(input))
  }

  if (input instanceof URL) {
    return app.hooks.on('dev.url', input)
  }

  return app
}
