import {Api} from '@roots/bud-typings'

export const dev: Api.Dev = function (config) {
  if (config?.proxy?.host || config?.proxy?.port) {
    this.features.set('proxy', true)
  }

  this.server.config.mergeStore(config)

  return this
}
