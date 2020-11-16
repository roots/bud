import {Bud, Server} from '@roots/bud-typings'

export const dev: Dev = function (config) {
  if (config?.proxy?.host || config?.proxy?.port) {
    this.features.set('proxy', true)
  }

  this.server.config.repository = {
    ...this.server.config.getStore(),
    ...config,
  }

  return this
}

export type Dev<T = Bud.Contract> = (
  this: T,
  config: Server.Config,
) => T
