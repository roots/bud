import middleware from 'webpack-dev-middleware'

const dev = bud => {
  return middleware(
    bud.compiler,
    options(bud.options.get('webpack.devServer')),
  )
}

const PROXY_MSG = {
  'X-Proxied-By': '@roots/bud',
}

const options = options => ({
  filename: options.filename || 'index.html',
  headers: {...options.headers, ...PROXY_MSG} || PROXY_MSG,
  lazy: options.lazy || false,
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

export {dev as default}
