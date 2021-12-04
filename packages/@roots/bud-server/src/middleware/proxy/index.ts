import {Options} from 'http-proxy-middleware'
import {URL} from 'url'

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
  const dev = new URL(app.store.get('server.proxy'))
  const proxy = new URL(app.store.get('server.dev'))

  /**
   * @filter proxy.interceptor
   */
  const interceptor = app.hooks.filter<'proxy.interceptor'>(
    'proxy.interceptor',
    async (buffer: Buffer) => {
      let response = buffer.toString('utf8')

      return app.hooks
        .filter<'proxy.replace'>('proxy.replace', () => [
          [proxy.href, dev.href],
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
      target: proxy.href,
      cookieDomainRewrite: {
        [proxy.href]: dev.href,
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
