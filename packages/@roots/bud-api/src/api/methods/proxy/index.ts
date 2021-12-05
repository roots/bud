import type {Framework, Server} from '@roots/bud-framework'

export interface proxy {
  (config?: Partial<Server.Configuration['proxy']>): Framework
}

export interface proxy {
  (config?: boolean): Framework
}

export const proxy: proxy = function (config) {
  const ctx = this as Framework

  if (typeof config === 'boolean') {
    ctx.store.set('server.middleware.proxy', config)
    return ctx
  }

  ctx.store.set('server.middleware.proxy', true)
  ctx.store.set('server.proxy', config)
  return ctx
}
