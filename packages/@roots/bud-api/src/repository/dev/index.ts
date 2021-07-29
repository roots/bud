import type {Server} from '@roots/bud-framework'

import type {Repository} from '../'

export const dev: Repository.Dev = function (config) {
  const target = this.parent ?? this

  target.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}
