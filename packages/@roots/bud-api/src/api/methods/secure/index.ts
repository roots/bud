import type {Framework, Server} from '@roots/bud-framework'
import {isBoolean} from 'lodash'

export interface secure {
  (
    config: Partial<Server.Configuration['ssl']> | boolean,
  ): Framework
}

export const secure: secure = function (
  config: Partial<Server.Configuration['ssl']> | boolean,
): Framework {
  const ctx = this as Framework

  if (typeof config === 'boolean') {
    ctx.store.set('server.ssl.enabled', config)
    return ctx
  }

  ctx.store.merge('server.ssl', {
    ...config,
    enabled: isBoolean(config.enabled) ? config.enabled : true,
  })
  return ctx
}
