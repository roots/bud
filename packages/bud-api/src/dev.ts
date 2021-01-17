import {Api} from '@roots/bud-typings'

export const dev: Api.Dev = function (config) {
  this.store.merge('server.config', config)

  return this
}
