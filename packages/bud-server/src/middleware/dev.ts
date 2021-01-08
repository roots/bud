import {Express, Webpack, Server, webpackDevMiddleware} from '@roots/bud-support'

export interface DevFactoryOptions {
  compiler: Webpack.Compiler
  config: Server['config']
}

/**
 * Ident header
 */
const BUD_HEADERS = {
  'X-Server': '@roots/bud',
}

/**
 * Make dev middleware
 */
const dev = ({
  compiler,
  config,
}: DevFactoryOptions): Express.RequestHandler =>
  WebpackDevMiddleware(compiler, options(config))

/**
 * Make dev middlware options
 */
const options = (
  config: Server['config'],
): webpackDevMiddleware.Options => {
  const options: any = {}

  /**
   * Filename
   */
  if (config.has('filename'))
    options.filename = config.get('filename')

  /**
   * Set the default file system which will be used by webpack as primary destination of generated files
   */
  if (config.has('fs')) options.fs = config.get('fs')

  return {
    ...options,

    /** This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" } */
    headers: BUD_HEADERS,

    /**
     * The index path for web server, defaults to "index.html".
     * If falsy (but not undefined), the server will not respond to requests to the root URL.
     */
    index: config.has('index')
      ? config.get('index')
      : 'index.html',

    /**
     * This option instructs the module to operate in 'lazy' mode,
     * meaning that it won't recompile when files change, but rather on each request.
     */
    lazy: config.has('lazy') ? config.get('lazy') : undefined,
    /**
     * In the rare event that a user would like to provide a custom logging interface,
     * this property allows the user to assign one
     */
    logger: config.has('logger')
      ? config.get('logger')
      : undefined,
    /**
     * This property defines the level of messages that the module will log
     * @default silent
     */
    logLevel: config.has('logger')
      ? config.get('logger')
      : 'silent',
    /**
     * If true the log output of the module will be prefixed by a timestamp in the HH:mm:ss format.
     * @default false
     */
    logTime: config.has('logTime')
      ? config.get('logTime')
      : undefined,
    /**
     * This property allows a user to pass the list of HTTP request methods accepted by the server.
     * @default ['GET','HEAD']
     */
    methods: config.has('methods')
      ? config.get('methods')
      : undefined,
    /**
     * This property allows a user to register custom mime types or extension mappings
     * @default null
     */
    mimeTypes: config.has('mimeTypes')
      ? config.get('mimeTypes')
      : undefined,
    /** The public path that the middleware is bound to */
    publicPath: '/',
    /**
     * Allows users to provide a custom reporter to handle
     * logging within the module
     *
     * @todo disabled
     */
    // reporter: config.has('reporter')
    // ? config.get('reporter')
    // : undefined,
    /** Instructs the module to enable or disable the server-side rendering mode */
    serverSideRender: config.has('serverSideRender')
      ? config.get('serverSideRender')
      : false,
    /** Options for formatting statistics displayed during and after compile */
    stats: config.get('stats') ?? true,
    /**
     * The module accepts an Object containing options for file watching, which
     * is passed directly to the compiler provided
     */
    watchOptions: config.get('watchOptions') ?? undefined,
    /**
     * If true, the option will instruct the module to write files to the configured
     * location on disk as specified in your webpack config file
     * This option also accepts a Function value, which can be used to filter which
     * files are written to disk
     */
    writeToDisk: config.has('writeToDisk')
      ? config.get('writeToDisk')
      : undefined,
  }
}

export {dev}
