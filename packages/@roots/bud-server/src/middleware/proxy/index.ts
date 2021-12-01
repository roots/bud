import {Options} from 'http-proxy-middleware'

import {
  createProxyMiddleware,
  responseInterceptor,
} from './proxy.dependencies'
import type {Framework} from './proxy.interface'

/**
 * Proxy middleware factory
 *
 * @public
 */
export default function proxy(app: Framework) {
  const port = app.store.is('server.port', 8080)
    ? null
    : app.store.get('server.port')

  /**
   * @filter proxy.dev
   */
  const dev = app.hooks.filter<'proxy.dev'>('proxy.dev', () =>
    port
      ? app.store.get('server.host').concat(`:`, port)
      : app.store.get('server.host'),
  )

  /**
   * @filter proxy.target
   */
  const target = app.hooks.filter<'proxy.target'>(
    'proxy.target',
    () => app.store.get('server.proxy.target'),
  )

  /**
   * @filter proxy.interceptor
   */
  const interceptor = app.hooks.filter<'proxy.interceptor'>(
    'proxy.interceptor',
    () => async (buffer: Buffer) => {
      let response = buffer.toString('utf8')

      return app.hooks
        .filter<'proxy.replace'>('proxy.replace', () => [
          [target, dev],
        ])
        .reduce(
          (html, [from, to]) => html.replaceAll(from, to),
          response,
        )
    },
  )

  /**
   * @filter proxy.options
   */
  const options = app.hooks.filter(
    'proxy.options',
    (): Options => ({
      autoRewrite: true,
      changeOrigin: true,
      target,
      cookieDomainRewrite: {
        [target]: dev,
      },
      logProvider: () => app.server.logger,
      onProxyRes: responseInterceptor(interceptor),
      selfHandleResponse: true,
      headers: {
        'X-Proxy-By': '@roots/bud',
      },
      logLevel: 'info',
      ssl: false,
      secure: false,
      ws: true,
      ...(app.store.get('server.proxy') ?? {}),
    }),
  )

  return createProxyMiddleware(options)
}
