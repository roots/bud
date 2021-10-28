import {middlewareConfigKeys} from './dev.constants'
import {
  isNull,
  isUndefined,
  WebpackDevMiddleware,
} from './dev.dependencies'
import type {Container, DevProps, Server} from './dev.interface'

/**
 * Dev middleware factory
 *
 * @public
 */
export default function dev({compiler, config}: DevProps) {
  const options = makeOptions(config)
  return WebpackDevMiddleware(compiler as any, options)
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
      .mutate('headers', (headers: Record<string, string>) => ({
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
