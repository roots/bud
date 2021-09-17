import {Framework, Server} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {isNull, isUndefined} from 'lodash'
import {Compiler, MultiCompiler} from 'webpack'
import DevMiddleware from 'webpack-dev-middleware'

/**
 * Middleware configuration keys
 *
 * @remarks
 * WDS middleware is pretty sensitive about what you pass it.
 *
 * @public
 */
const middlewareConfigKeys = [
  'headers',
  'index',
  'methods',
  'mimeTypes',
  'publicPath',
  'serverSideRender',
  'stats',
  'outputFileSystem',
  'writeToDisk',
]

/**
 * Dev middleware factory
 *
 * @public
 */
export default function dev({
  compiler,
  config,
}: {
  this: Framework
  compiler: Compiler | MultiCompiler
  config: Container<Server.Configuration>
}) {
  const options = makeOptions(config)
  this.log('dev middleware options', options)

  return DevMiddleware(compiler, options)
}

/**
 * Dev middleware options factory
 *
 * @public
 */
const makeOptions = (
  config: Container<Server.Configuration>,
): DevMiddleware.Options => ({
  writeToDisk: true,
  index: 'index.html',
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
