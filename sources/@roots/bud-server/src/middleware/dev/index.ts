import type {Framework, Server} from '@roots/bud-framework'
import WebpackDevMiddleware, {
  IncomingMessage,
  ServerResponse,
} from 'webpack-dev-middleware'

export interface dev
  extends Server.MiddlewareRecord<
    WebpackDevMiddleware.Options<IncomingMessage, ServerResponse>
  > {
  (app: Framework): any
}

/**
 * Dev middleware factory
 *
 * @public
 */
export function dev(app: Framework) {
  const options = makeOptions(app)
  return WebpackDevMiddleware(app.compiler.instance as any, options)
}

/**
 * Dev middleware options factory
 *
 * @public
 */
const makeOptions = (
  app: Framework,
): WebpackDevMiddleware.Options<IncomingMessage, ServerResponse> =>
  app.hooks.filter('middleware.dev.options', () => ({
    headers: {
      ['X-Server']: '@roots/bud',
    },
    publicPath: app.hooks.filter('build.output.publicPath'),
    stats: false,
    writeToDisk: true,
  }))
