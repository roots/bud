import middleware from 'webpack-dev-middleware'

const dev = bud => {
  return middleware(
    bud.compiler,
    options(bud.paths, bud.options.get('server')),
  )
}

const PROXY_MSG = {
  'X-Server': '@roots/bud',
}

const options = (paths, options) => ({
  quiet: true,
  filename: options?.filename ?? 'index.html',
  headers: {...options?.headers, ...PROXY_MSG} ?? PROXY_MSG,
  lazy: options?.lazy ?? false,
  logLevel: options?.logLevel ?? 'silent',
  logTime: options?.logTime ?? false,
  methods: options?.methods ?? ['GET', 'HEAD'],
  mimeTypes: options?.mimeTypes ?? null,
  publicPath: paths.get('public'),
  serverSideRender: options?.serverSideRender ?? false,
  stats: options?.stats ?? false,
  watchOptions: options?.watchOptions ?? {
    aggregateTimeout: 300,
    poll: true,
  },
  writeToDisk: options?.writeToDisk ?? false,
})

export {dev as default}
