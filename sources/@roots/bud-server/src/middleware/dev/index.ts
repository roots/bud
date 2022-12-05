import type {Bud} from '@roots/bud-framework'
import type {Server} from '@roots/bud-framework/services'
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
  WebpackDevMiddleware<IncomingMessage, ServerResponse>(
    app.compiler.instance as any,
    app.hooks.filter(`dev.middleware.dev.options`, {
      headers: app.hooks.filter(`dev.middleware.dev.options.headers`, [
        {key: `Access-Control-Allow-Origin`, value: `*`},
        {key: `Access-Control-Allow-Headers`, value: `*`},
        {key: `x-powered-by`, value: `@roots/bud`},
      ]),
      index: app.hooks.filter(
        `dev.middleware.dev.options.index`,
        undefined,
      ),
      publicPath: app.hooks.filter(
        `dev.middleware.dev.options.publicPath`,
        app.hooks.filter(`build.output.publicPath`, `auto`),
      ),
      writeToDisk: app.hooks.filter(
        `dev.middleware.dev.options.writeToDisk`,
        true,
      ),
    }),
  )
