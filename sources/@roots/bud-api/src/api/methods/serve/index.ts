import type {Framework, Server} from '@roots/bud-framework'
import {URL} from 'url'

export interface serve {
  (port: number): Framework
}

export interface serve {
  (url: URL): Framework
}

export interface serve {
  (url: string): Framework
}

export interface serve {
  (config: Partial<Server.DevConfiguration>): Framework
}

export const serve: serve = function (config): Framework {
  const ctx = this as Framework

  if (typeof config === 'number') {
    const url = ctx.hooks.filter('dev.url')
    url.port = `${config}`
    ctx.hooks.on('dev.url', () => url)
    return ctx
  }

  if (typeof config === 'string') {
    ctx.hooks.on('dev.url', () => new URL(config))
    return ctx
  }

  if (config instanceof URL) {
    ctx.hooks.on('dev.url', () => config)
    return ctx
  }

  config.url && ctx.hooks.on('dev.url', () => config.url)
  config.watch?.files &&
    ctx.hooks.on('dev.watch.files', () => config.watch.files)

  config.watch?.options &&
    ctx.hooks.on('dev.watch.options', () => config.watch.options)

  config.client?.scripts &&
    ctx.hooks.on('dev.client.scripts', () => config.client.scripts)

  return ctx
}
