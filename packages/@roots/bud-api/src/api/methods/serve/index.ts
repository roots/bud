import type {Framework, Server} from '@roots/bud-framework'

export interface serve {
  (config?: Partial<Server.Configuration['dev']>): Framework
}

export const serve: serve = function (config) {
  const ctx = this as Framework

  ctx.store.set('server.dev', config)

  return ctx
}
