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
  let dev = new URL(app.store.get('server.dev')).origin
  let proxy = new URL(app.store.get('server.proxy')).origin

  if (
    dev.endsWith(':80') ||
    dev.endsWith(':443') ||
    dev.endsWith(':8080')
  ) {
    dev = dev.split(':').slice(0, 2).join(':')
  }

  if (
    proxy.endsWith(':80') ||
    proxy.endsWith(':443') ||
    proxy.endsWith(':8080')
  ) {
    proxy = proxy.split(':').slice(0, 2).join(':')
  }

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
        return
      }

      return app.hooks
        .filter<'proxy.replace'>('proxy.replace', () => [
          [proxy, dev],
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
      target: proxy,
      cookieDomainRewrite: {
        [proxy]: dev,
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

  app.info({message: 'proxy config', suffix: options})

  return createProxyMiddleware(options)
}
