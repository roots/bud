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
      stats: app.hooks.filter(`dev.middleware.dev.options.stats`),
      writeToDisk: app.hooks.filter(
        `dev.middleware.dev.options.writeToDisk`,
      ),
    }))
    .hooks.on(`dev.middleware.dev.options.headers`, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'x-powered-by': '@roots/bud',
    })
    .hooks.on(`dev.middleware.dev.options.publicPath`, () =>
      app.hooks.filter('build.output.publicPath'),
    )
    .hooks.on(`dev.middleware.dev.options.stats`, 'none')
    .hooks.on(`dev.middleware.dev.options.writeToDisk`, true)

    .hooks.on(`dev.middleware.hot.options`, () => ({
      path: app.hooks.filter('dev.middleware.hot.options.path'),
      log: app.hooks.filter('dev.middleware.hot.options.log'),
      heartbeat: app.hooks.filter('dev.middleware.hot.options.heartbeat'),
    }))
    .hooks.on(`dev.middleware.hot.options.path`, () => `/__bud/hmr`)
    .hooks.on(
      `dev.middleware.hot.options.log`,
      app.logger.instance.scope('hot').info,
    )
    .hooks.on(`dev.middleware.hot.options.heartbeat`, 2000)
    .hooks.on(`dev.client.scripts`, clientScripts.callback)
    .hooks.on(`dev.watch.files`, new Set([]))
    .hooks.on(`dev.watch.options`, {})
}
