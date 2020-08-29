import {createProxyMiddleware as middleware} from 'http-proxy-middleware'

const routes = bud => {
  const target = {
    host:
      bud.options.get('webpack.devServer.proxy.target') ||
      bud.options.get('webpack.devServer.target'),
    port: bud.options.get('webpack.devServer.proxy.port') || 3000,
  }

  const host =
    bud.options.get('webpack.devServer.host') || 'localhost'
  const port = bud.options.get('webpack.devServer.port') || 8000

  return {
    [`${host}:${port}`]: `${target.host}:${target.port}`,
  }
}

const proxy = bud =>
  middleware({
    target: bud.options.get(`webpack.devServer.target`),
    autoRewrite:
      bud.options.get('webpack.devServer.autoRewrite') || true,
    changeOrigin:
      bud.options.get('webpack.devServer.changeOrigin') || true,
    ws: bud.options.get('webpack.devServer.ws') || true,
    router: routes(bud),
  })

export {proxy as default}
