import {
  createProxyMiddleware,
  RequestHandler,
  Options,
} from 'http-proxy-middleware'

import url from 'url'
import zlib from 'zlib'

import {ServerConfig} from '..'

/**
 * Proxy middleware factory
 */
const proxy = (config: ServerConfig): RequestHandler => {
  /**
   * Origin server
   */
  const from = {
    host: config.from?.host ?? config.host ?? 'localhost',
    port: config.from?.port ?? config.port ?? 8000,
    ssl: config.ssl ?? false,
  }

  /**
   * Proxy server
   */
  const to = {
    host: config.to?.host ?? config.host ?? 'localhost',
    port: config.to?.port ?? 3000,
    ssl: config.ssl ?? false,
  }

  /**
   * Fabricate URL from provided options.
   */
  const getUrl = target =>
    url.format({
      protocol: target.ssl ?? from.ssl ? 'https' : 'http',

      hostname: /^[a-zA-Z]+:\/\//.test(target.host)
        ? target.host.replace(/^[a-zA-Z]+:\/\//, '')
        : target.host,
    })

  /**
   * Custom headers
   */
  const headers = {
    'X-Powered-By': '@roots/bud',
    'X-Bud-Proxy-From': from.host,
    'X-Bud-Proxy-Secure': from.ssl,
  }

  /**
   * Rewrite hostname in body contents
   */
  const transformBody = (body: string): string =>
    body.replace(
      new RegExp(from.host, 'g'),
      `${to.host}:${to.port}`,
    )

  /**
   * Proxy response handler.
   */
  const onProxyRes = (proxyRes, req, res) => {
    let body = Buffer.from([])

    proxyRes.on('data', data => {
      body = Buffer.concat([body, data])
    })

    /**
     * Send response
     */
    proxyRes.on('end', () => {
      /**
       * Set headers
       */
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
        /**
         * Handle non-gzipped responses.
         */
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
   */
  const proxyOptions: Options = {
    target: getUrl(from),
    forward: getUrl(to),
    autoRewrite: config.autoRewrite,
    headers,
    hostRewrite: `${to.host}:${to.port}`,
    changeOrigin: config.changeOrigin,
    followRedirects: config.followRedirects,
    logLevel: 'silent',
    ssl: config.ssl ?? false,
    secure: config.ssl ?? false,
    ws: config.ws ?? true,
    cookieDomainRewrite: {
      [from.host]: to.host,
    },
    onProxyRes,
    selfHandleResponse: true,
  }

  return createProxyMiddleware(proxyOptions)
}

export {proxy as default}
