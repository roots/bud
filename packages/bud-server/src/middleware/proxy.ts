import {
  createProxyMiddleware,
  RequestHandler,
  Options,
} from 'http-proxy-middleware'
import Framework from '@roots/bud-typings'

import zlib from 'zlib'

/**
 * Proxy middleware factory
 */
const proxy = (
  config: Framework.Server.Config,
): RequestHandler => {
  /**
   * Source location
   */
  const source = {
    host: config.host,
    port: config.port,
  }

  /**
   * Proxy to location
   */
  const proxy = {
    host: config.proxy?.host,
    port: config.proxy?.port,
  }

  /**
   * Custom headers
   */
  const headers = {
    'X-Powered-By': '@roots/bud',
    'X-Bud-Proxy-From': source.host,
    'X-Bud-Proxy-Secure': config.ssl,
  }

  /**
   * Fabricate URL from provided options.
   */
  const getUrl = target => {
    const protocol = config.ssl ? 'https://' : 'http://'

    const hostname = /^[a-zA-Z]+:\/\//.test(target.host)
      ? target.host.replace(/^[a-zA-Z]+:\/\//, '')
      : target.host

    const port = port => {
      return port && (port !== 8000 || port !== 443)
        ? `:${port}`
        : ``
    }

    return `${protocol}${hostname}${port(target.port)}`
  }

  /**
   * Rewrite hostname in body contents
   */
  const transformBody = (body: string): string =>
    body.replace(
      new RegExp(`${source.host}:${source.port}`, 'g'),
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
   */
  const proxyOptions: Options = {
    onProxyRes,
    headers,
    target: getUrl(source),
    hostRewrite: `${proxy.host}:${proxy.port}`,
    autoRewrite: config.autoRewrite,
    changeOrigin: config.changeOrigin,
    logLevel: 'silent',
    ssl: config.ssl ?? false,
    secure: config.ssl ?? false,
    ws: config.ws ?? true,
    selfHandleResponse: true,
  }

  return createProxyMiddleware(proxyOptions)
}

export {proxy}
