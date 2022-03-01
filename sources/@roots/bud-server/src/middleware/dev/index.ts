import type {Framework, Server} from '@roots/bud-framework'
import WebpackDevMiddleware, {
  IncomingMessage,
  ServerResponse,
} from 'webpack-dev-middleware'

/**
 * Dev middleware factory
 *
 * @public
 */
export interface dev
  extends Server.Middleware.Definition<
    WebpackDevMiddleware.Options<IncomingMessage, ServerResponse>
  > {
  (app: Framework): any
}

export const dev = (app: Framework) =>
  WebpackDevMiddleware(app.compiler.instance, makeOptions(app))

/**
 * Dev middleware options factory
 *
 * @public
 */
const makeOptions = (
  app: Framework,
): WebpackDevMiddleware.Options<IncomingMessage, ServerResponse> =>
  app.hooks.filter(`middleware.dev.options`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'x-powered-by': '@roots/bud',
    },
    publicPath: app.hooks.filter(`build.output.publicPath`),
    stats: app.hooks.filter(`middleware.dev.options.stats`, 'errors-only'),
    writeToDisk: app.hooks.filter(
      `middleware.dev.options.writeToDisk`,
      true,
    ),
  })
