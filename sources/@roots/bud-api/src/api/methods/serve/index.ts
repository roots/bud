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
  (config: Partial<Server.Configuration['dev']>): Framework
}

export const serve: serve = function (
  config: URL | string | number | Partial<Server.Configuration['dev']>,
): Framework {
  const ctx = this as Framework

  if (typeof config === 'number') {
    const url = ctx.store.get('server.dev.url')
    url.port = `${config}`
    ctx.store.set('server.dev.url', url)
    return ctx
  }

  if (typeof config === 'string') {
    ctx.store.set('server.dev.url', new URL(config))
    return ctx
  }

  if (config instanceof URL) {
    ctx.store.set('server.dev.url', config)
    return ctx
  }

  ctx.store.set('server.dev', config)
  return ctx
}
