import {createProxyMiddleware as middleware} from 'http-proxy-middleware'
import createDomain from '../util/createDomain'
import zlib from 'zlib'

const proxy = bud => {
  const dev = {
    host:
      bud.options.get('webpack.devServer.host') || 'localhost',
    port: bud.options.get('webpack.devServer.port') || 3000,
  }

  const proxy = {
    host: bud.hooks.filter(
      'server.proxy.host',
      bud.options.get('webpack.devServer.proxy.host'),
    ),
    port:
      bud.options.get('webpack.devServer.proxy.port') || 8000,
  }

  const proxyOptions = {
    target: `http://${proxy.host}`,
    autoRewrite: true,
    hostRewrite: dev.host,
    changeOrigin: true,
    followRedirects: false,
    ssl: bud.options.get('webpack.devServer.ssl') ?? false,
    secure: bud.options.get('webpack.devServer.ssl') ?? false,
    ws: bud.options.get('webpack.devServer.ws') ?? true,
    cookieDomainRewrite: {
      [proxy.host]: dev.host,
    },
    router: {
      [`http://${proxy.host}`]: `http://${dev.host}`,
    },

    /**
     * Handle rewriting text/html contents
     * replacing the target url with the host url
     */
    selfHandleResponse: true,
    onProxyRes: function (proxyRes, req, res: any) {
      let body = Buffer.from([])

      proxyRes.on('data', data => {
        body = Buffer.concat([body, data])
      })

      proxyRes.on('end', () => {
        res.set({
          'content-type': proxyRes.headers['content-type'],
        })

        if (proxyRes.headers['content-encoding'] == 'gzip') {
          res.set({'content-encoding': 'gzip'})

          const transformBody = zlib
            .gunzipSync(body)
            .toString()
            .replace(
              new RegExp(
                `http:\/\/${proxy.host.replace(
                  /^[a-zA-Z]+:\/\//,
                  '',
                )}`,
                'g',
              ),
              createDomain(bud),
            )

          res.send(zlib.gzipSync(transformBody))
        } else {
          res.send(Buffer.from(body))
        }

        res.end()
      })
    },
  }

  return middleware(proxyOptions)
}

export {proxy as default}
