import {middlewareConfigKeys} from './middleware.constants'
import {
  isNull,
  isUndefined,
  WebpackDevMiddleware,
} from './middleware.dependencies'
import type {
  Compiler,
  Container,
  Framework,
  MultiCompiler,
  Server,
} from './middleware.interface'

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
