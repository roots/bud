import Server from '@roots/bud-server'

export const autoRewrite: Server.Config['autoRewrite'] = true

export const changeOrigin: Server.Config['changeOrigin'] = true

export const followRedirects: Server.Config['followRedirects'] = true

export const headers: Server.Config['headers'] = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods':
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers':
    'X-Requested-With, content-type, Authorization',
}

export const host: Server.Config['host'] = 'localhost'

export const port: Server.Config['port'] = 3000

export const index: Server.Config['index'] = 'index.html'

export const lazy: Server.Config['lazy'] = false

export const methods: Server.Config['methods'] = ['GET', 'HEAD']

export const mimeTypes: Server.Config['mimeTypes'] = null

export const ssl: Server.Config['ssl'] = false

export const secure: Server.Config['secure'] = false

export const serverSideRender: Server.Config['serverSideRender'] = false

export const watchOptions: Server.Config['watchOptions'] = {
  aggregateTimeout: 300,
  poll: true,
}

export const writeToDisk: Server.Config['writeToDisk'] = true

export const ws: Server.Config['ws'] = true
