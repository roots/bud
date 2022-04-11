import {Bud} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import {ensureDir} from 'fs-extra'
import {urlToHttpOptions} from 'url'

const {writeJson} = fs

/**
 * Event compiler done hook
 *
 * @remarks
 * Generates and emits `hmr.json` with proxy/dev server information
 * for use in Acorn.
 *
 * @public
 */
export default async function (app: Bud) {
  try {
    await ensureDir(app.path('@dist'))

    await writeJson(app.path('@dist', 'hmr.json'), {
      dev: urlToHttpOptions(app.server.connection.url) ?? null,
      proxy:
        urlToHttpOptions(app.hooks.filter('dev.middleware.proxy.target')) ??
        null,
      publicPath: app.hooks.filter('build.output.publicPath') ?? null,
    })
  } catch (error) {
    app.error(error)
  }
}
