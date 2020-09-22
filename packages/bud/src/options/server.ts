import {ServerConfig} from '@roots/bud-server'

const server: ServerConfig = {
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
  publicPath: '/',
  ssl: false,
  secure: false,
  serverSideRender: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  writeToDisk: true,
  ws: true,
}

export {server as default}
