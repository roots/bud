import type {Framework, Server} from '@roots/bud-framework'
import {URL} from 'url'

export interface proxy {
  (config?: Server.Configuration['proxy']['url']): Framework
}

export interface proxy {
  (config?: boolean): Framework
}

export interface proxy {
  (config?: number): Framework
}

export interface proxy {
  (url?: URL): Framework
}

export interface proxy {
  (config?: Partial<Server.Configuration['proxy']>): Framework
}

export const proxy: proxy = function (
  config: URL | Partial<Server.Configuration['proxy']> | boolean | number,
) {
  const ctx = this as Framework

  if (typeof config === 'undefined') {
    ctx.api.log('log', 'enabling proxy')
    ctx.store.set('server.middleware.proxy', true)
    return ctx
  }

  if (typeof config === 'boolean') {
    ctx.api.log('log', config ? 'enabling' : 'disabling', 'proxy')
    ctx.store.set('server.middleware.proxy', config)
    return ctx
  }

  ctx.store.set('server.middleware.proxy', true)
  ctx.api.log('log', 'enabling proxy')

  if (typeof config === 'number') {
    const url = ctx.store.get('server.proxy.url')
    url.port = `${config}`
    ctx.store.set('server.proxy.url', url)
    return ctx
  }

  if (typeof config === 'string') {
    ctx.store.set('server.proxy.url', new URL(config))
    return ctx
  }

  if (config instanceof URL) {
    ctx.store.set('server.proxy.url', config)
    return ctx
  }

  ctx.api.log('error', {
    message: 'proxy fallthrough! maybe misconfiguration.',
    suffix: config,
  })

  return ctx
}
