import type {Bud, Server} from '@roots/bud-framework'
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
  (app: Bud): any
}

export const dev = (app: Bud) =>
  WebpackDevMiddleware(
    app.compiler.instance,
    app.hooks.filter(`dev.middleware.dev.options`, {
      headers: app.hooks.filter(`dev.middleware.dev.options.headers`),
      index: app.hooks.filter(`dev.middleware.dev.options.index`),
      publicPath: app.hooks.filter(
        `dev.middleware.dev.options.publicPath`,
      ),
      writeToDisk: app.hooks.filter(
        `dev.middleware.dev.options.writeToDisk`,
      ),
    }),
  )
