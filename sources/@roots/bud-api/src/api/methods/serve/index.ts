import type {Framework, Server} from '@roots/bud-framework'

export type UserInput =
  | URL
  | string
  | number
  | Partial<Server.Configuration>

export interface method {
  (input?: UserInput): Framework
}

export type facade = method

export const method: method = function (input) {
  const ctx = this as Framework

  if (typeof input === 'number') {
    ctx.hooks.on('dev.url', url => {
      url.port = `${input}`
      return url
    })

    return ctx
  }

  if (typeof input === 'string') {
    ctx.hooks.on('dev.url', () => new URL(input))
    return ctx
  }

  if (input instanceof URL) {
    ctx.hooks.on('dev.url', () => input)
    return ctx
  }

  input.url && ctx.hooks.on('dev.url', () => input.url)

  input.watch?.files &&
    ctx.hooks.on('dev.watch.files', () => input.watch.files)

  input.watch?.options &&
    ctx.hooks.on('dev.watch.options', () => input.watch.options)

  input.client?.scripts &&
    ctx.hooks.on('dev.client.scripts', () => input.client.scripts)

  return ctx
}
