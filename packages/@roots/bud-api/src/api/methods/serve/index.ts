import type {Framework, Server} from '@roots/bud-framework'

export interface serve {
  (config?: Partial<Server.Configuration>): Framework
}

export const serve: serve = function (config) {
  this as Framework

  config.host && this.store.set('server.host', config.host)
  config.port && this.store.set('server.port', config.port)

  config.middleware &&
    this.store.merge('server.middleware', config.middleware)

  return this
}
