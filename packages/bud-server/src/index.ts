import {Bud} from '@roots/bud'
import express, {Express} from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import {createProxyMiddleware} from 'http-proxy-middleware'
import injectEntrypoints from './injectEntrypoints'
import createDomain from './createDomain'

const app = express()

const server = (bud: Bud): Express => {
  const config = bud.options.get('webpack')

  const domain = createDomain(
    bud.options.get('webpack.devServer'),
    app,
  )

  bud.options.set('webpack.entry', injectEntrypoints(domain, config))

  bud.apply('compiler', webpack(bud.config(bud)))

  app.use(
    devMiddleware(
      bud.compiler,
      makeDevOptions(bud, config.devServer),
    ),
  )

  app.use(hotMiddleware(bud.compiler, makeHotOptions()))

  config.devServer.proxy &&
    app.use(
      '**',
      createProxyMiddleware(makeProxyOptions(config.devServer)),
    )

  app.listen(config.devServer.port, config.devServer.host)

  bud.compiler.hooks.afterEmit.tap('bud', () => {
    bud.fs.outputFile(bud.dist('hot'), domain)
  })

  return app
}

const poweredBy = {
  'X-Proxied-By': '@roots/bud',
}

const makeDevOptions = (bud, options) => ({
  filename: options.filename || 'index.html',
  headers: {...options.headers, ...poweredBy} || poweredBy,
  lazy: options.lazy || false,
  logger: options.logger || bud.logger,
  logLevel: options.logLevel || 'info',
  logTime: options.logTime || true,
  methods: options.methods || ['GET', 'HEAD'],
  mimeTypes: options.mimeTypes || null,
  publicPath: options.publicPath,
  serverSideRender: options.serverSideRender || false,
  stats: options.stats || false,
  watchOptions: options.watchOptions || {
    aggregateTimeout: 300,
    poll: true,
  },
  writeToDisk: options.writeToDisk || false,
})

const makeHotOptions = () => ({
  path: '/__webpack_hmr',
  heartbeat: 2000,
})

const makeProxyOptions = config => ({
  target: config.proxy.target,
  autoRewrite: config.proxy.autoRewrite || true,
  changeOrigin: config.proxy.changeOrigin || true,
  ws: config.proxy.ws || true,
  router: {
    [`${config.proxy.target || 'localhost'}:3000`]: `${
      config.proxy.host
    }:${config.proxy.port || 8000}`,
  },
})

export {server as default}
