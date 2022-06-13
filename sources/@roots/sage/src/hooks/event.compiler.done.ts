import type {Bud} from '@roots/bud-framework'
import fs from 'fs-extra'
import {urlToHttpOptions} from 'node:url'

/**
 * `event.compiler.done` callback
 *
 * @remarks
 * Generates and emits `hmr.json` with proxy/dev server information
 * for use in Acorn.
 *
 * @public
 */
export default async function (app: Bud) {
  try {
    await fs.ensureDir(app.path('@dist'))

    await fs.writeJson(app.path('@dist', 'hmr.json'), {
      dev: urlToHttpOptions(app.server.connection.url) ?? null,
      proxy:
        urlToHttpOptions(
          app.hooks.filter('dev.middleware.proxy.target'),
        ) ?? null,
      publicPath: app.hooks.filter('build.output.publicPath') ?? null,
    })
  } catch (error) {
    app.error(error)
  }
}
