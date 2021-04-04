import yargs from 'yargs'

/**
 * Args
 */
export const args: any = Object.entries(
  yargs(process.argv.slice(2))
    .parserConfiguration({'camel-case-expansion': false})
    .options({
      bail: {
        type: 'boolean',
      },
      cache: {
        type: 'boolean',
      },
      clean: {
        type: 'boolean',
      },
      ci: {
        type: 'boolean',
      },
      debug: {
        type: 'boolean',
      },
      define: {},
      devtool: {},
      discover: {
        type: 'boolean',
      },
      entry: {},
      externals: {},
      fileformat: {
        type: 'string',
      },
      hash: {
        type: 'boolean',
      },
      hashFormat: {
        type: 'string',
      },
      html: {
        type: 'boolean',
      },
      template: {
        type: 'string',
      },
      install: {
        type: 'boolean',
      },
      log: {
        type: 'boolean',
      },
      manifest: {
        type: 'boolean',
      },
      minify: {
        type: 'boolean',
      },
      mode: {
        type: 'string',
      },
      noEmitOnErrors: {
        type: 'boolean',
      },
      parallelism: {
        type: 'number',
      },
      profile: {
        type: 'boolean',
      },
      runtimeChunkEnabled: {
        type: 'boolean',
      },
      splitChunksEnabled: {
        type: 'boolean',
      },
      'splitChunks.chunks': {
        type: 'string',
      },
      'splitChunks.minSize': {
        type: 'number',
      },
      'splitChunks.maxSize': {
        type: 'number',
      },
      'splitChunks.minChunks': {
        type: 'number',
      },
      'splitChunks.maxAsyncRequests': {
        type: 'number',
      },
      'splitChunks.maxInitialRequests': {
        type: 'number',
      },
      alias: {},
      stats: {
        type: 'boolean',
      },
      target: {
        type: 'string',
      },
      'resolve.extensions': {
        type: 'array',
      },
      'resolve.modules': {
        type: 'array',
      },
      project: {
        type: 'string',
      },
      src: {
        type: 'string',
      },
      dist: {
        type: 'string',
      },
      storage: {
        type: 'string',
      },
      modules: {
        type: 'string',
      },
      publicPath: {
        type: 'string',
      },
      records: {
        type: 'string',
      },
      'browser.indicator': {
        type: 'boolean',
      },
      'browser.overlay': {
        type: 'boolean',
      },
      'browser.log': {
        type: 'boolean',
      },
      'server.host': {
        type: 'string',
      },
      'server.port': {
        type: 'number',
      },
      'server.proxy.host': {
        type: 'string',
      },
      'server.proxy.port': {
        type: 'number',
      },
      'server.loglevel': {
        type: 'string',
      },
      'server.methods': {
        type: 'array',
      },
      'server.middleware.proxy': {
        type: 'boolean',
      },
      'server.middleware.hot': {
        type: 'boolean',
      },
      'server.middleware.dev': {
        type: 'boolean',
      },
      'server.watch.files': {
        type: 'array',
      },
      'server.watch.options.persistent': {
        type: 'boolean',
      },
      'theme.spacing': {
        type: 'string',
      },
      'theme.color.foreground': {
        type: 'string',
      },
      'theme.color.faded': {
        type: 'string',
      },
      'theme.color.primary': {
        type: 'string',
      },
      'theme.color.primary.alt': {
        type: 'string',
      },
      'theme.color.error': {
        type: 'string',
      },
      'theme.color.error.alt': {
        type: 'string',
      },
      'theme.color.warning': {
        type: 'string',
      },
      'theme.color.success': {
        type: 'string',
      },
      'theme.color.accent': {
        type: 'string',
      },
      'theme.color.flavor': {
        type: 'string',
      },
    })
    .parse(),
)
  /**
   * Reduces string bools to literal bools
   */
  .reduce(
    (a, [k, v]) => ({
      ...a,
      [k]: v == 'true' ? true : v == 'false' ? false : v,
    }),
    {},
  )
