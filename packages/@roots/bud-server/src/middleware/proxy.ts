import zlib from 'zlib'

import {createProxyMiddleware} from './middleware.dependencies'
import type {
  Container,
  Framework,
  ProxyMiddleware,
  Server,
} from './middleware.interface'

/**
 * Proxy middleware factory
 *
 * @public
 */
export default function proxy({
  config,
}: {
  this: Framework
  config: Container<Server.Configuration>
}) {
  const port = config.is('port', 8080)
    ? null
    : config.get('port')

  const dev = port
    ? config.get('host').concat(`:`, port)
    : config.get('host')

  // Proxy host & port
  const target = config.get('proxy.target')

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
        // Not gzip
        res.send(Buffer.from(transformBody(body.toString())))
      }

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
    onProxyRes,
    selfHandleResponse: true,
    target,
    headers,
    logLevel: 'warn',
    ssl: false,
    secure: false,
    ws: true,
  }

  return createProxyMiddleware(options)
}
