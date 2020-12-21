import type {Framework, Server} from '@roots/bud-typings'

export const dev: Dev = function (config) {
  if (config?.proxy?.host || config?.proxy?.port) {
    this.features.set('proxy', true)
  }

  this.server.config.mergeStore(config)

  return this
}

export type Dev = (
  this: Framework,
  config: Server.Config,
) => Framework
