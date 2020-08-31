import {createProxyMiddleware as middleware} from 'http-proxy-middleware'
import createDomain from '../util/createDomain'
import zlib from 'zlib'

const proxy = bud => {
  const target = {
    host:
      bud.options.get('webpack.devServer.proxy.target') ||
      bud.options.get('webpack.devServer.target'),
    port: bud.options.get('webpack.devServer.proxy.port') || 3000,
  }

  const host =
    bud.options.get('webpack.devServer.host') || 'localhost'
  const port = bud.options.get('webpack.devServer.port') || 8000

  const proxyOptions = {
    target: bud.options.get(`webpack.devServer.target`),
    autoRewrite: true,
    hostRewrite:
      bud.options.get('webpack.devServer.hostRewrite') ??
      `${host}:${port}`,
    changeOrigin: true,
    cookieDomainRewrite: bud.options.get(
      'webpack.devServer.cookieDomainRewrite',
    ) ?? {
      [`${target.host.replace(/^[a-zA-Z]+:\/\//, '')}`]: createDomain(
        bud,
      ),
    },
    ws: bud.options.get('webpack.devServer.ws') ?? true,
    xfwd: true,

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
          'content-encoding': 'gzip',
        })

        if (proxyRes.headers['content-encoding'] == 'gzip') {
          const transformBody = zlib
            .gunzipSync(body)
            .toString()
            .replace(
              new RegExp(
                `http:\/\/${target.host.replace(
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

  bud.bind('proxy', proxyOptions)

  return middleware(proxyOptions)
}

export {proxy as default}
