import {Bud, Server} from '@roots/bud-typings'

export const dev: Dev = function (config) {
  if (config?.proxy?.host || config?.proxy?.port) {
    this.features.set('proxy', true)
  }

  this.server.config.repository = {
    ...this.server.config.all(),
    ...config,
  }

  return this
}

export type Dev = (
  this: Bud.Contract,
  config: Server.Config,
) => Bud.Contract
