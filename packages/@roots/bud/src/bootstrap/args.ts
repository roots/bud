import yargs from 'yargs'
import {readConfig} from './readConfig'

/**
 * Args
 */
export const args: any = Object.entries(
  yargs(process.argv.slice(2))
    .parserConfiguration({'camel-case-expansion': false})
    .config(readConfig())
    .options({
      name: {
        type: 'string',
        default: 'bud',
      },
      bail: {
        type: 'boolean',
        default: true,
      },
      cache: {
        type: 'boolean',
        default: true,
      },
      clean: {
        type: 'boolean',
        default: true,
      },
      ci: {
        type: 'boolean',
        default: false,
      },
      debug: {
        type: 'boolean',
        default: false,
      },
      define: {
        default: {},
      },
      devtool: {
        default: {},
      },
      discover: {
        type: 'boolean',
        default: false,
      },
      entry: {
        default: {},
      },
      externals: {
        default: {},
      },
      fileFormat: {
        type: 'string',
        default: '[name].js',
      },
      hash: {
        type: 'boolean',
        default: false,
      },
      hashFormat: {
        type: 'string',
        default: `[name].[hash]`,
      },
      html: {
        type: 'boolean',
        default: true,
      },
      template: {
        type: 'string',
        default: null,
      },
      install: {
        type: 'boolean',
        default: false,
      },
      log: {
        type: 'boolean',
        default: false,
      },
      manifest: {
        type: 'boolean',
        require: true,
        default: true,
      },
      minify: {
        type: 'boolean',
        default: false,
      },
      mode: {
        type: 'string',
        default: 'production',
      },
      namedModules: {
        type: 'boolean',
        default: true,
      },
      node: {
        default: {
          module: 'empty',
          dns: 'mock',
          fs: 'empty',
          http2: 'empty',
          net: 'empty',
          tls: 'empty',
          child_process: 'empty',
        },
      },
      noEmit: {
        type: 'boolean',
        default: true,
      },
      parallelism: {
        type: 'number',
        default: 1,
      },
      profile: {
        type: 'boolean',
        default: false,
      },
      runtimeChunk: {
        type: 'boolean',
        default: false,
      },
      use: {
        type: 'array',
        default: [],
      },
      splitChunksEnabled: {
        type: 'boolean',
        default: false,
      },
      'splitChunks.chunks': {
        type: 'string',
        default: 'async',
      },
      'splitChunks.minSize': {
        type: 'number',
        default: 20000,
      },
      'splitChunks.maxSize': {
        type: 'number',
        default: 0,
      },
      'splitChunks.minChunks': {
        type: 'number',
        default: 1,
      },
      'splitChunks.maxAsyncRequests': {
        type: 'number',
        default: 30,
      },
      'splitChunks.maxInitialRequests': {
        type: 'number',
        default: 30,
      },
      alias: {
        module: {
          type: 'array',
        },
        default: {},
      },
      stats: {
        type: 'boolean',
        default: false,
      },
      target: {
        type: 'string',
        default: 'web',
      },
      'resolve.extensions': {
        type: 'array',
        default: ['.wasm', '.mjs', '.js', '.css', '.json'],
      },
      'resolve.modules': {
        type: 'array',
        default: [],
      },
      'location.project': {
        type: 'string',
        default: process.cwd(),
      },
      'location.src': {
        type: 'string',
        default: 'src',
      },
      'location.dist': {
        type: 'string',
        default: 'dist',
      },
      'location.storage': {
        type: 'string',
        default: '.bud',
      },
      'location.modules': {
        type: 'string',
        default: 'node_modules',
      },
      'location.publicPath': {
        type: 'string',
        default: '/',
      },
      'location.records': {
        type: 'string',
        default: 'records.json',
      },
      'server.host': {
        type: 'string',
        default: 'localhost',
      },
      'server.port': {
        type: 'number',
        default: 3000,
      },
      'server.proxy.host': {
        type: 'string',
        default: 'localhost',
      },
      'server.proxy.port': {
        type: 'number',
        default: 8000,
      },
      'server.loglevel': {
        type: 'string',
        default: 'silent',
      },
      'server.methods': {
        type: 'array',
        default: ['GET', 'HEAD'],
      },
      'server.middleware.proxy': {
        type: 'boolean',
        default: false,
      },
      'server.middleware.hot': {
        type: 'boolean',
        default: true,
      },
      'server.middleware.dev': {
        type: 'boolean',
        default: true,
      },
      'server.watch.files': {
        type: 'array',
        default: [
          '**/*.html',
          '**/*.php',
          '**/*.ejs',
          '!node_modules',
          '!vendor',
        ],
      },
      'server.watch.options.persistent': {
        type: 'boolean',
        default: true,
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
).reduce(
  (a, [k, v]) => ({
    ...a,
    [k]: v == 'true' ? true : v == 'false' ? false : v,
  }),
  {},
)
