import {Server} from '@roots/bud-framework'
import DevMiddleware from 'webpack-dev-middleware'
import {isNull, isUndefined} from 'lodash'
import {Compiler, MultiCompiler} from 'webpack/types'

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
const dev: Server.Middleware.Init = ({
  compiler,
  config,
}: {
  compiler: Compiler | MultiCompiler
  config: Server.Config
}) => {
  return DevMiddleware(compiler as any, options(config))
}

/**
 * Make dev middlware options
 */
const options = (
  config: Server.Config,
): DevMiddleware.Options => ({
  writeToDisk: true,
  stats: false,
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
