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
      makeDevOptions(bud, domain, config.devServer),
    ),
  )

  app.use(
    hotMiddleware(
      bud.compiler,
      makeHotOptions(bud, domain, config.devServer),
    ),
  )

  if (config.devServer.proxy) {
    const proxyOptions = makeProxyOptions(bud, config.devServer)
    const proxyMiddleware = createProxyMiddleware(proxyOptions)
    app.use('**', proxyMiddleware)
  }

  app.listen(config.devServer.port, 'localhost')

  bud.compiler.hooks.afterEmit.tap('bud', compilation => {
    bud.fs.outputFile(bud.dist('hot'), domain)
  })
  return app
}

const makeDevOptions = (bud, domain, options) => ({
  filename: options.filename || 'index.html',
  headers: options.headers || {},
  lazy: options.lazy || false,
  logger: options.logger || bud.logger,
  logLevel: options.logLevel || 'info',
  logTime: options.logTime || true,
  methods: options.methods || ['GET', 'HEAD'],
  mimeTypes: options.mimeTypes || null,
  publicPath: options.publicPath,
  serverSideRender: options.serverSideRender || false,
  stats: options.stats || false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  writeToDisk: options.writeToDisk || false,
})

const makeHotOptions = (bud, domain, options) => ({
  path: '/__webpack_hmr',
  heartbeat: 2000,
})

const makeProxyOptions = (bud, options) => ({
  target: options.proxy.target,
  autoRewrite: options.proxy.autoRewrite || true,
  changeOrigin: options.proxy.changeOrigin || true,
  ws: options.proxy.ws || true,
  router: {
    [`${options.proxy.target}:3000`]: `${options.host}:8000`,
  },
})

export {server as default}
