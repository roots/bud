import {
  createProxyMiddleware,
  RequestHandler,
  Options,
} from 'http-proxy-middleware'
import Framework from '@roots/bud-typings'

import url from 'url'
import zlib from 'zlib'

/**
 * Proxy middleware factory
 */
const proxy = (
  config: Framework.Server.Config,
): RequestHandler => {
  const dev = {
    host: config.host ?? 'localhost',
    port: config.port ?? 8000,
    ssl: config.ssl ?? false,
  }

  /**
   * Proxy server
   */
  const proxy = {
    host: config.proxy?.host ?? config.host ?? 'localhost',
    port: config.proxy?.port ?? 3000,
    ssl: config.ssl ?? false,
  }

  /**
   * Fabricate URL from provided options.
   */
  const getUrl = target =>
    url.format({
      protocol: target.ssl ?? dev.ssl ? 'https' : 'http',

      hostname: /^[a-zA-Z]+:\/\//.test(target.host)
        ? target.host.replace(/^[a-zA-Z]+:\/\//, '')
        : target.host,
    })

  /**
   * Custom headers
   */
  const headers = {
    'X-Powered-By': '@roots/bud',
    'X-Bud-Proxy-From': dev.host,
    'X-Bud-Proxy-Secure': dev.ssl,
  }

  /**
   * Rewrite hostname in body contents
   */
  const transformBody = (body: string): string =>
    body.replace(
      new RegExp(dev.host, 'g'),
      `${proxy.host}:${proxy.port}`,
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
    target: getUrl(dev),
    forward: getUrl(proxy),
    autoRewrite: config.autoRewrite,
    headers,
    hostRewrite: `${proxy.host}:${proxy.port}`,
    changeOrigin: config.changeOrigin,
    followRedirects: config.followRedirects,
    logLevel: 'silent',
    ssl: config.ssl ?? false,
    secure: config.ssl ?? false,
    ws: config.ws ?? true,
    cookieDomainRewrite: {
      [dev.host]: proxy.host,
    },
    onProxyRes,
    selfHandleResponse: true,
  }

  return createProxyMiddleware(proxyOptions)
}

export {proxy}
