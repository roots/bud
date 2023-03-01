import type {Bud} from '@roots/bud-framework'
import type {MiddlewareFactory} from '@roots/bud-server/middleware'
import WebpackDevMiddleware, {
  IncomingMessage,
  ServerResponse,
} from '@roots/bud-support/webpack-dev-middleware'

export const factory: MiddlewareFactory = (app: Bud) =>
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
        app.publicPath(),
      ),
      writeToDisk: app.hooks.filter(
        `dev.middleware.dev.options.writeToDisk`,
        true,
      ),
    }),
  )
