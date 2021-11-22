import {middlewareConfigKeys} from './dev.constants'
import {
  isNull,
  isUndefined,
  WebpackDevMiddleware,
} from './dev.dependencies'
import type {Framework} from './dev.interface'

/**
 * Dev middleware factory
 *
 * @public
 */
export default function dev(app: Framework) {
  const options = makeOptions(app)
  return WebpackDevMiddleware(
    app.compiler.instance as any,
    options,
  )
}

/**
 * Dev middleware options factory
 *
 * @public
 */
const makeOptions = (
  app: Framework,
): WebpackDevMiddleware.Options => ({
  writeToDisk: true,
  index: 'index.html',
  ...Object.fromEntries(
    app.store
      .mutate(
        'server.headers',
        (headers: Record<string, string>) => ({
          ...headers,
          ['X-Server']: '@roots/bud',
        }),
      )
      .getEntries()
      .filter(
        ([key, option]: [string, unknown]) =>
          middlewareConfigKeys.includes(key) &&
          !isUndefined(option) &&
          !isNull(option),
      ),
  ),
})
