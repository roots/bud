import Server from '@roots/bud-server'

const store: Server.Config = {
  autoRewrite: true,
  changeOrigin: true,
  followRedirects: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
  host: 'localhost',
  port: 3000,
  index: 'index.html',
  lazy: false,
  methods: ['GET', 'HEAD'],
  mimeTypes: null,
  ssl: false,
  secure: false,
  serverSideRender: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  writeToDisk: true,
  ws: true,
  // publicPath: '/', :: hardwired bud.fs.get(bud.paths.public)
}

export default store
