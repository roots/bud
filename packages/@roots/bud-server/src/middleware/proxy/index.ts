import {truncate} from 'lodash'
import zlib from 'zlib'

import {createProxyMiddleware} from './proxy.dependencies'
import type {Framework, ProxyMiddleware} from './proxy.interface'

/**
 * Proxy middleware factory
 *
 * @public
 */
export default function proxy(app: Framework) {
  const port = app.store.is('server.port', 8080)
    ? null
    : app.store.get('server.port')

  const dev = port
    ? app.store.get('server.host').concat(`:`, port)
    : app.store.get('server.host')

  const target = app.store.get('server.proxy.target')

  // Headers
  const headers = {
    'X-Powered-By': '@roots/bud',
  }

  /**
   * Rewrite hostname in body contents
   *
   * @public
   */
  const transformBody = (body: string): string =>
    body.replace(new RegExp(target, 'g'), dev)

  /**
   * Proxy response handler
   *
   * @public
   */
  const onProxyRes = (proxyRes, req, res) => {
    let body = Buffer.from([])

    proxyRes.on('data', data => {
      body = Buffer.concat([body, data])
    })

    proxyRes.on('end', () => {
      res.set({
        ...proxyRes.headers,
        'content-type': proxyRes.headers['content-type'],
        ...headers,
      })

      /**
       * Handle gzipped responses
       */
      if (proxyRes.headers['content-encoding'] == 'gzip') {
        res.set({'content-encoding': 'gzip'})

        res.send(
          zlib.gzipSync(
            transformBody(zlib.gunzipSync(body).toString()),
          ),
        )
      } else {
        res.send(Buffer.from(transformBody(body.toString())))
      }

      app.server.log(
        'success',
        'proxied response',
        truncate(body.toString(), {
          length: process.stdout.columns ?? 70,
        }),
      )

      /**
       * Send response to client.
       */
      res.end()
    })
  }

  /**
   * Proxy middleware configuration
   *
   * @public
   */
  const options: ProxyMiddleware.Options = {
    autoRewrite: true,
    changeOrigin: true,
    cookieDomainRewrite: {
      [target]: dev,
    },
    logProvider: () => app.server.logger,
    onProxyRes,
    selfHandleResponse: true,
    target,
    headers,
    logLevel: 'info',
    ssl: false,
    secure: false,
    ws: true,
  }

  return createProxyMiddleware(options)
}
