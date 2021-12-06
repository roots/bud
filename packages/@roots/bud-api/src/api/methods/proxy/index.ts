import type {Framework, Server} from '@roots/bud-framework'

export interface proxy {
  (config?: Server.Configuration['proxy']['url']): Framework
}

export interface proxy {
  (config?: boolean): Framework
}

export interface proxy {
  (config?: Partial<Server.Configuration['proxy']>): Framework
}

export const proxy: proxy = function (
  config:
    | Server.Configuration['proxy']['url']
    | Partial<Server.Configuration['proxy']>
    | boolean,
) {
  const ctx = this as Framework

  if (typeof config === 'undefined') {
    ctx.api.log('log', 'enabling proxy')
    ctx.store.set('server.middleware.proxy', true)
  }

  if (typeof config === 'boolean') {
    ctx.api.log(
      'log',
      config ? 'enabling' : 'disabling',
      'proxy',
    )
    ctx.store.set('server.middleware.proxy', config)
    return ctx
  }

  ctx.store.set('server.middleware.proxy', true)
  ctx.api.log('log', 'enabling proxy')

  if (typeof config === 'string') {
    ctx.store.set('server.proxy.url', config)
    ctx.api.log('log', {
      message: 'proxy url set',
      suffix: config,
    })

    return ctx
  }

  ctx.store.set('server.proxy', config)
  ctx.api.log('log', {
    message: 'proxy config set',
    suffix: config,
  })

  return ctx
}
