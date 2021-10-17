import type {Framework, Server} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import type {Compiler, MultiCompiler} from 'webpack'

import {isNull, isUndefined} from '../services/lodash'
import {WebpackDevMiddleware} from '../services/webpack-dev-middleware'

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

  return WebpackDevMiddleware(compiler, options)
}

/**
 * Dev middleware options factory
 *
 * @public
 */
const makeOptions = (
  config: Container<Server.Configuration>,
): WebpackDevMiddleware.Options => ({
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
