import {Server} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {isNull, isUndefined} from 'lodash'
import {Compiler, MultiCompiler} from 'webpack'
import DevMiddleware from 'webpack-dev-middleware'

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
}: {
  compiler: Compiler | MultiCompiler
  config: Container<Server.Configuration>
}) => {
  return DevMiddleware(compiler as any, options(config))
}

/**
 * Make dev middlware options
 */
const options = (
  config: Container<Server.Configuration>,
): DevMiddleware.Options => ({
  writeToDisk: true,
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
