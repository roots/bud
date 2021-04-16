import {Command} from '../Command'
import {Error} from '@roots/bud-dashboard'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Build
 */
export class Build extends Command {
  public name = `build`

  public signature = '<mode>'

  public description =
    'Compile assets and/or initialize development server'

  public arguments = {
    mode: '[choices: "development" or "production"]',
  }

  public options = {
    name: {
      type: 'string',
      description: 'Name of project',
      default: 'bud',
    },
    bail: {
      type: 'boolean',
      description:
        'Exit compilation immediately when an exception is thrown',
      default: true,
    },
    cache: {
      type: 'boolean',
      description:
        'Cache compilation results for faster rebuilds',
      default: true,
    },
    clean: {
      type: 'boolean',
      description: 'Clean stale built assets between each build',
      default: true,
    },
    ci: {
      type: 'boolean',
      description:
        'Present compilation summary as a simple webpack table',
      default: false,
    },
    debug: {
      type: 'boolean',
      description:
        'Dump a webpack config to the storage directory',
      default: false,
    },
    define: {
      entrypoint: {
        type: 'array',
      },
      description:
        'Define variables to be included in the application runtime',
      default: false,
    },
    devtool: {
      description: 'Specify a devtool to be used',
      default: true,
    },
    discover: {
      type: 'boolean',
      description:
        'Automatically enable bud extensions discovered by the framework',
      default: false,
    },
    entry: {
      entrypoint: {
        type: 'array',
      },
      description: 'Specify entrypoints for your application',
      default: false,
    },
    externals: {
      module: {
        type: 'array',
      },
      description:
        'Specify modules external to your application',
      default: false,
    },
    hash: {
      type: 'boolean',
      description: 'Apply a randomized ID to asset filenames',
      default: false,
    },
    hashFormat: {
      type: 'string',
      description:
        'Supply a string indicating how file should be formatted',
      default: `[name].[hash].js`,
    },
    html: {
      type: 'boolean',
      description: 'Generate html boilerplate',
      default: true,
    },
    template: {
      type: 'string',
      description: 'Template location\n',
      default: null,
    },
    install: {
      type: 'boolean',
      description:
        'Automatically install missing modules as requested by any installed extensions',
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
      description: 'Minify bundled assets',
      type: 'boolean',
      default: false,
    },
    mode: {
      type: 'string',
      default: 'production',
    },
    namedModules: {
      description:
        'Label bundled modules with human-readable names',
      type: 'boolean',
    },
    noEmit: {
      description:
        "Don't emit assets in the event of a compilation error",
      type: 'boolean',
    },
    parallelism: {
      description: 'Run compilation tasks in parallel',
      type: 'number',
      default: 1,
    },
    profile: {
      type: 'boolean',
    },
    runtimeChunk: {
      description:
        'Perform code splitting operations on the bundle',
      type: 'boolean',
      default: false,
    },
    use: {
      type: 'array',
      description: 'Enable extensions\n',
      default: [],
    },
    'splitChunks.enable': {
      short: 'splitChunks',
      description:
        'Separate vendored code from application code',
      default: false,
    },
    'splitChunks.chunks': {
      description: '',
      default: 'async',
    },
    'splitChunks.minSize': {
      description: '',
      default: 20000,
    },
    'splitChunks.maxSize': {
      description: '',
      default: 0,
    },
    'splitChunks.minChunks': {
      description: '',
      default: 1,
    },
    'splitChunks.maxAsyncRequests': {
      description: '',
      default: 30,
    },
    'splitChunks.maxInitialRequests': {
      description: '\n',
      default: 30,
    },
    alias: {
      description: 'Webpack aliases --alias.{name} {module}',
      default: {},
    },
    stats: {
      type: 'boolean',
    },
    target: {
      type: 'string',
      default: 'web',
      describe: 'Webpack target\n',
    },
    'resolve.extensions': {
      type: 'array',
      short: 'extensions',
      description:
        'Attempt to resolve modules using these extensions',
      default: ['.wasm', '.mjs', '.js', '.css', '.json'],
    },
    'resolve.modules': {
      type: 'array',
      description: 'Paths to resolve modules from\n',
      default: [],
    },
    'location.project': {
      type: 'string',
      default: 'process.cwd',
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
      description:
        'Output records to this location (used for caching operations)\n',
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
    },
    'server.middleware.hot': {
      type: 'boolean',
    },
    'server.middleware.dev': {
      type: 'boolean',
    },
    'server.watch.files [arr]': {
      type: 'array',
      default: [
        '**/*.html',
        '**/*.php',
        '**/*.ejs',
        '!node_modules',
        '!vendor',
      ],
      description: `Reload when changed ['**/*.html','**/*.php','**/*.ejs']`,
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
  }

  /**
   * JSON name
   */
  public get jsonName() {
    return `${this.cli.app.name}.config.json`
  }

  /**
   * Fluent name
   */
  public get fluentName() {
    return `${this.cli.app.name}.config.js`
  }

  /**
   * Preflight check
   */
  @bind
  public async action() {
    const projectFiles = this.cli.app.disk.get('project')

    // Guard against multi config
    projectFiles.has(this.jsonName) &&
      projectFiles.has(this.fluentName) &&
      Error(
        `Project contains both a ${this.jsonName} and ${this.fluentName}. They are mutually exclusive.`,
        'Multiple config sources found.',
      )

    // Guard against no config
    !projectFiles.has(this.jsonName) &&
      !projectFiles.has(this.fluentName) &&
      Error(
        `Project doesn't seem to have a config. If you need a starter config run:$ ${this.cli.app.name} publish @roots/bud-support ${this.fluentName}`,
        'No config sources found.',
      )

    const build = require(projectFiles.get(this.fluentName))

    build(this.cli.app).run()
  }
}
