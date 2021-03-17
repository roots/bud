import {
  express,
  isNull,
  isUndefined,
  Webpack,
  webpackDevMiddleware,
} from '@roots/bud-support'
import {Server} from '@roots/bud-typings'

export interface DevFactoryOptions {
  compiler: Webpack.Compiler
  config: Server.Config
}

const middlewareConfigKeys = [
  'headers',
  'index',
  'methods',
  'mimeTypes',
  'publicPath',
  'serverSideRender',
  'stats',
  'outputFileSysem',
  'writeToDisk',
]

/**
 * Make dev middleware
 */
const dev = ({
  compiler,
  config,
}: DevFactoryOptions): express.RequestHandler => {
  return webpackDevMiddleware(compiler, options(config))
}

/**
 * Make dev middlware options
 */
const options = (
  config: Server.Config,
): webpackDevMiddleware.Options => ({
  logLevel: 'silent',
  ...Object.fromEntries(
    config
      .mutate('headers', headers => ({
        ...headers,
        ['X-Server']: '@roots/bud',
      }))
      .getEntries()
      .filter(
        ([key, option]: [string, unknown]) =>
          middlewareConfigKeys.includes(key) &&
          !isUndefined(option) &&
          !isNull(option),
      ),
  ),
})

export {dev}
