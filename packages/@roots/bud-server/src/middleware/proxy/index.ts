import {Options} from 'http-proxy-middleware'
import {URL} from 'url'

import {
  createProxyMiddleware,
  responseInterceptor,
} from './proxy.dependencies'
import type {Framework} from './proxy.interface'
import {replace} from './proxy.replace'

/**
 * Proxy middleware factory
 *
 * @public
 */
export default function proxy(app: Framework) {
  const dev = new URL(app.store.get('server.dev'))
  const proxy = new URL(app.store.get('server.proxy'))

  /**
   * @filter proxy.interceptor
   */
  const interceptor = app.hooks.filter<'proxy.interceptor'>(
    'proxy.interceptor',
    () => async (buffer: Buffer) => {
      let response = buffer?.toString('utf8')

      if (!response) {
        app.warn(
          `proxy interceptor had a problem with a buffer val`,
        )

        return buffer
      }

      const replacements = app.hooks.filter<'proxy.replace'>(
        'proxy.replace',
        replace(proxy, dev),
      )

      return replacements.reduce(
        (html: string, [from, to]) => html.replaceAll(from, to),
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
      target: proxy.origin,
      cookieDomainRewrite: {
        [proxy.origin]: dev.origin,
      },
      logProvider: () => app.server.logger,
      onProxyRes: responseInterceptor(interceptor),
      selfHandleResponse: true,
      headers: {
        'X-Proxy-By': '@roots/bud',
      },
      logLevel: 'info',
      ws: true,
    }),
  )

  return createProxyMiddleware(options)
}
