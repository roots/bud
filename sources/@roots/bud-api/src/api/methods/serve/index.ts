import type {Framework} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/src/Server'
import {lodash} from '@roots/bud-support'

const {isFunction} = lodash

export type UserInput = [
  URL | string,
  (
    | Connection.Options
    | ((options: Connection.Options) => Connection.Options)
  ),
]

export interface method {
  (...input: UserInput): Framework
}

export type facade = method

export const method: method = function (...input) {
  const app = this as Framework

  if (!app.isDevelopment) return app

  const [url, options] = input

  if (options) {
    const unwrapped = isFunction(options)
      ? options(app.hooks.filter('dev.options'))
      : options

    app.hooks.on('dev.options', unwrapped)
  }

  if (typeof input === 'number') {
    return app.hooks.on('dev.url', url => {
      url.port = `${input}`
      return url
    })
  }

  if (typeof input === 'string') {
    return app.hooks.on('dev.url', new URL(input))
  }

  if (input instanceof URL) {
    return app.hooks.on('dev.url', input)
  }

  url && app.hooks.on('dev.url', url instanceof URL ? url : new URL(url))

  return app
}
