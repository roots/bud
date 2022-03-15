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
  WebpackDevMiddleware(
    app.compiler.compilation,
    app.hooks.filter(`middleware.dev.options`),
  )
