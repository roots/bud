import type {Framework, Server} from '@roots/bud-framework'

export interface proxy {
  (config?: Partial<Server.Configuration['proxy']>): Framework
}

export const proxy: proxy = function (config) {
  const ctx = this as Framework

  config && ctx.store.set('server.proxy', config)

  return ctx
}
