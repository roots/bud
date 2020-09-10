import {createProxyMiddleware as middleware} from 'http-proxy-middleware'
import zlib from 'zlib'
import url from 'url'

const proxy = bud => {
  /**
   * Origin server
   */
  const from = {
    host: bud.hooks.filter(
      'server.from.host',
      bud.options.get('server.from.host'),
    ),

    port:
      bud.hooks.filter(
        'server.from.port',
        bud.options.get('server.from.port'),
      ) ?? 8000,

    ssl: bud.hooks.filter(
      'server.from.ssl',
      bud.options.get('server.from.ssl') ?? false,
    ),
  }

  /**
   * Proxy server
   */
  const to = {
    host:
      bud.hooks.filter(
        'server.to.host',
        bud.options.get('server.to.host'),
      ) ??
      bud.options.get('server.from.host') ??
      'localhost',

    port:
      bud.hooks.filter(
        'server.to.port',
        bud.options.get('server.to.port'),
      ) ?? 3000,

    ssl: bud.hooks.filter(
      'server.to.ssl',
      bud.options.get('server.to.ssl') ?? false,
    ),
  }

  /**
   * Fabricate URL from provided options.
   */
  const getUrl = target =>
    url.format({
      protocol:
        target.ssl ?? bud.options.get('server.ssl')
          ? 'https'
          : 'http',

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
  const transformBody = body =>
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
  const proxyOptions = {
    target: getUrl(from),
    autoRewrite: true,
    headers,
    hostRewrite: `${to.host}:${to.port}`,
    changeOrigin: true,
    followRedirects: true,
    ssl: bud.options.get('server.ssl') ?? false,
    secure: bud.options.get('server.ssl') ?? false,
    ws: bud.options.get('server.ws') ?? true,
    cookieDomainRewrite: {
      [from.host]: to.host,
    },
    onProxyRes,
    selfHandleResponse: true,
  }

  return middleware(proxyOptions)
}

export {proxy as default}
