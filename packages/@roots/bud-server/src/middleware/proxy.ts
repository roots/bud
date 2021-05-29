import {
  createProxyMiddleware,
  Options,
} from 'http-proxy-middleware'
import zlib from 'zlib'
import {Server} from '@roots/bud-framework'

/**
 * Proxy middleware factory
 */
export const proxy: Server.Middleware.Init = ({config}) => {
  // Source host & port
  const source: Server.Middleware.Target = {
    host: config.get('host'),
    port: config.get('port'),
  }

  // Proxy host & port
  const proxy: Server.Middleware.Target = {
    host: config.get('proxy.host'),
    port: config.get('proxy.port'),
  }

  // Headers
  const headers = {
    'X-Powered-By': '@roots/bud',
    'X-Bud-Proxy-From': source.host,
    'X-Bud-Proxy-Secure': `${config.isTrue('ssl')}`,
  }

  // Fabricate URL from provided options.
  const getUrl = (target: Server.Middleware.Target): string => {
    const protocol = config.isTrue('ssl')
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
  const proxyOptions: Options = {
    autoRewrite: true,
    changeOrigin: true,
    cookieDomainRewrite: {
      [source.host]: proxy.host,
    },
    onProxyRes,
    selfHandleResponse: true,
    target: getUrl(proxy),
    headers,
    hostRewrite: `${source.host}:${source.port}`,
    logLevel: 'silent',
    ssl: config.isTrue('ssl'),
    secure: config.isTrue('ssl'),
    ws: config.isTrue('ws'),
  }

  return createProxyMiddleware(proxyOptions)
}
