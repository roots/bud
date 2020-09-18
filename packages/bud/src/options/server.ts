const server = {
  /**
   * Dev middleware
   */
  hot: false,
  disableHostCheck: true,
  inline: true,
  changeOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
  writeToDisk: true,
  publicPath: '/',
  index: 'index.html',
  lazy: false,
  logLevel: 'silent',
  methods: ['GET', 'HEAD'],
  mimeTypes: null,
  serverSideRender: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },

  /**
   * Proxy middleware
   */
  autoRewrite: true,
  followRedirects: true,
  ssl: false,
  secure: false,
  ws: true,
}

export {server as default}
