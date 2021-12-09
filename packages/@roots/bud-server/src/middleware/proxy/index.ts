import {Options} from 'http-proxy-middleware'
import {URL, urlToHttpOptions} from 'url'

import {
  createProxyMiddleware,
  responseInterceptor,
} from './proxy.dependencies'
import type {Framework} from './proxy.interface'
import * as replace from './proxy.replace'

/**
 * Proxy middleware factory
 *
 * @public
 */
export default function proxy(app: Framework) {
  /**
   * body parser replacements
   */
  const replacements = []

  /**
   * server config records
   */
  const config = app.store.get('server')

  /**
   * dev URL
   */
  const dev = new URL(config.dev.url)

  /**
   * proxy URL
   */
  const proxy = new URL(config.proxy.url)

  /**
   * publicPath
   */
  const publicPath = proxy.pathname.replace(`:${proxy.port}`, '')

  /**
   * Log info to console
   */
  app.server
    .log('info', 'configuring proxy middleware')
    .log('info', {
      message: 'dev server url',
      suffix: config.dev.url,
    })
    .log('info', {
      message: 'proxy server url',
      suffix: config.proxy.url,
    })
    .log('info', {
      message: 'dev server URL object',
      suffix: JSON.stringify(urlToHttpOptions(dev)),
    })
    .log('info', {
      message: 'proxy server URL object',
      suffix: JSON.stringify(urlToHttpOptions(proxy)),
    })
    .log('info', {
      message: 'publicPath',
      suffix: publicPath,
    })

  /**
   * Replace proxy server values matching [origin][publicPath]
   */
  replacements.push([
    `${proxy.origin}${publicPath}`,
    `${dev.origin}${publicPath}`,
  ])

  /**
   * replace href="" values matching proxy origin
   */
  if (config.proxy.replace.href == true) {
    replacements.push(replace.href(proxy, dev))
  }

  /**
   * replace window.location prop assignments matching proxy origin
   */
  if (config.proxy.replace.window == true) {
    replacements.push(replace.window(proxy, dev))
  }

  /**
   * Filter replacement values
   */
  const filteredReplacements = app.hooks.filter(
    'proxy.replace',
    () => replacements,
  )

  /**
   * log results
   */
  app.server.log('info', {
    message: 'proxy url replacements',
    suffix: JSON.stringify(filteredReplacements),
  })

  /**
   * Proxy interceptor does body string replacements on request
   * @filter proxy.interceptor
   */
  const interceptor = app.hooks.filter<'proxy.interceptor'>(
    'proxy.interceptor',
    () =>
      async (buffer: Buffer): Promise<string | Buffer> => {
        const response = buffer?.toString('utf8')

        return !response
          ? buffer
          : filteredReplacements.reduce(
              (
                html: string,
                [from, to]: [string | RegExp, string],
              ) => html.replaceAll(from, to),
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
      target: `${proxy.origin}`,
      router: {...({[`${publicPath}`]: '/'} ?? {})},
      cookieDomainRewrite: {[proxy.origin]: dev.origin},
      logProvider: () => app.server.logger,
      onProxyRes: responseInterceptor(interceptor),
      autoRewrite: true,
      changeOrigin: true,
      followRedirects: true,
      selfHandleResponse: true,
      logLevel: 'info',
      ws: true,
      headers: {
        'X-Proxy-By': '@roots/bud',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Access-Control-Allow-Methods': '*',
      },
    }),
  )

  /**
   * Return configured middleware
   */
  return createProxyMiddleware(options)
}
