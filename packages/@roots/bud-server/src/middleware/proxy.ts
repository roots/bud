import {
  createProxyMiddleware,
  zlib,
} from './middleware.dependencies'
import type {
  Container,
  Framework,
  ProxyMiddleware,
  Server,
} from './middleware.interface'

/**
 * Returns dev host and port
 *
 * @public
 */
const parseDev = (
  config: Container<Server.Configuration>,
): Server.Target => {
  return {
    host: config.get('host'),
    port: config.get('port'),
  }
}

/**
 * Returns proxy host and port
 *
 * @public
 */
const parseProxy = (
  config: Container<Server.Configuration>,
): Server.Target => {
  return {
    host: config.get('proxy.target.host'),
    port: config.get('proxy.target.port'),
  }
}

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
  // Dev server host & port
  const dev = parseDev(config)

  // Proxy host & port
  const proxy = parseProxy(config)

  // Headers
  const headers = {
    'X-Powered-By': '@roots/bud',
    'X-Bud-Proxy-From': proxy.host,
    'X-Bud-Proxy-Secure': `${config.isTrue('ssl')}`,
  }

  // Fabricate URL from provided options.
  const getUrl = (target: Server.Target): string => {
    const protocol = config.isTrue('ssl')
      ? 'https://'
      : 'http://'

    const hostname = /^[a-zA-Z]+:\/\//.test(target.host)
      ? target.host.replace(/^[a-zA-Z]+:\/\//, '')
      : target.host

    const port = (port: number) => {
      return port !== 8080 || 443 ? `:${port}` : ``
    }

    return `${protocol}${hostname}${port(target.port)}`
  }

  /**
   * Rewrite hostname in body contents
   *
   * @public
   */
  const transformBody = (body: string): string =>
    body.replace(
      new RegExp(`${proxy.host}:${proxy.port}`, 'g'),
      `${dev.host}:${dev.port}`,
    )

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
      [proxy.host]: dev.host,
    },
    onProxyRes,
    selfHandleResponse: true,
    target: getUrl(proxy),
    headers,
    hostRewrite: `${dev.host}:${dev.port}`,
    logLevel: 'silent',
    ssl: config.isTrue('proxy.ssl'),
    secure: config.isTrue('proxy.secure'),
    ws: config.isTrue('proxy.ws'),
  }

  return createProxyMiddleware(options)
}
