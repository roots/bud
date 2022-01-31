import {Framework} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import {ensureDir} from 'fs-extra'
import {urlToHttpOptions} from 'url'
import {Stats} from 'webpack'

const {writeJson} = fs

/**
 * Event compiler done hook
 *
 * @remarks
 * Generates and emits `hmr.json` with proxy/dev server information
 * for use in Acorn.
 *
 * @param stats - webpack stats object
 * @returns stats
 *
 * @public
 */
export default async function (this: Framework, stats: Stats) {
  try {
    const contents = {
      dev: urlToHttpOptions(this.hooks.filter('dev.url')) ?? null,
      proxy:
        urlToHttpOptions(this.hooks.filter('middleware.proxy.target')) ??
        null,
      publicPath: this.hooks.filter('build.output.publicPath') ?? null,
      hash: stats ? stats.toJson().hash : null,
    }

    await ensureDir(this.path('dist'))
    await writeJson(this.path('dist', 'hmr.json'), contents)
  } catch (error) {
    throw new Error(error)
  }

  return stats
}
