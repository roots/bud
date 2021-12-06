import type {Framework, Server} from '@roots/bud-framework'

export interface serve {
  (config: Server.Configuration['dev']['url']): Framework
}

export interface serve {
  (config: Partial<Server.Configuration['dev']>): Framework
}

export const serve: serve = function (config) {
  const ctx = this as Framework

  if (typeof config === 'string') {
    ctx.store.set('server.dev.url', config)
    return ctx
  }

  ctx.store.set('server.dev', config)
  return ctx
}
