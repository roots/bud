import type {Bud} from '@roots/bud-framework'

import * as clientScripts from './hooks/dev.client.scripts.js'

/**
 * Initial values
 *
 * @public
 */
export const seed = (app: Bud) => {
  app.hooks
    .on(`dev.middleware.dev.options`, () => ({
      headers: app.hooks.filter(`dev.middleware.dev.options.headers`),
      publicPath: app.hooks.filter(
        `dev.middleware.dev.options.publicPath`,
      ),
    }))
    .hooks.on(`dev.middleware.dev.options.headers`, {
      'Access-Control-Allow-Origin': `*`,
      'Access-Control-Allow-Headers': `*`,
      'x-powered-by': `@roots/bud`,
    })
    .hooks.on(`dev.middleware.dev.options.publicPath`, () =>
      app.hooks.filter(`build.output.publicPath`),
    )
    .hooks.on(`dev.client.scripts`, clientScripts.callback)
    .hooks.on(`dev.watch.files`, new Set([]))
    .hooks.on(`dev.watch.options`, {})
}
