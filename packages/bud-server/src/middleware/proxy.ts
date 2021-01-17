import ProxyMiddleware, {
  createProxyMiddleware,
} from 'http-proxy-middleware'
import zlib from 'zlib'

import type {Server} from '@roots/bud-typings'

declare type Target = {
  host: string
  port: number
}

/**
 * Proxy middleware factory
 */
const proxy = (
  config: Server.Config,
): ProxyMiddleware.RequestHandler => {
  // Source host & port
  const source: Target = {
    host: config.get('host'),
    port: config.get('port'),
  }

  // Proxy host & port
  const proxy: Target = {
    host: config.get('proxy.host'),
    port: config.get('proxy.port'),
  }

  // Headers
  const headers = {
    'X-Powered-By': '@roots/bud',
    'X-Bud-Proxy-From': source.host,
    'X-Bud-Proxy-Secure': `${config.enabled('ssl')}`,
  }

  // Fabricate URL from provided options.
  const getUrl = (target: Target): string => {
    const protocol = config.enabled('ssl')
      ? 'https://'
      : 'http://'

    const hostname = /^[a-zA-Z]+:\/\//.test(target.host)
      ? target.host.replace(/^[a-zA-Z]+:\/\//, '')
      : target.host

    const port = (port: number) => {
      return port !== 8000 || 443 ? `:${port}` : ``
    }

    return `${protocol}${hostname}${port(target.port)}`
  }

  /**
   * Rewrite hostname in body contents
   */
  const transformBody = (body: string): string =>
    body.replace(
      new RegExp(`${proxy.host}:${proxy.port}`, 'g'),
      `${source.host}:${source.port}`,
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
  const proxyOptions: ProxyMiddleware.Options = {
    autoRewrite: config.get('autoRewrite'),
    changeOrigin: config.get('changeOrigin'),
    cookieDomainRewrite: {
      [source.host]: proxy.host,
    },
    onProxyRes,
    selfHandleResponse: true,
    target: getUrl(proxy),
    headers,
    hostRewrite: `${source.host}:${source.port}`,
    logLevel: 'silent',
    ssl: config.enabled('ssl'),
    secure: config.enabled('ssl'),
    ws: config.enabled('ws'),
  }

  return createProxyMiddleware(proxyOptions)
}

export {proxy}
