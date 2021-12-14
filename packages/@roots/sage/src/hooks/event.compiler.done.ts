import {Framework} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import {ensureDir} from 'fs-extra'
import {URL, urlToHttpOptions} from 'url'
import {Stats} from 'webpack'

const {writeJson} = fs

export default (app: Framework) => async (stats: Stats) => {
  const contents = {
    dev: urlToHttpOptions(
      new URL(app.store.get('server.dev.url')),
    ),
    proxy: app.store.is('server.middleware.proxy', true)
      ? urlToHttpOptions(
          new URL(app.store.get('server.proxy.url')),
        )
      : false,
    publicPath: app.hooks.filter('build.output.publicPath'),
  }

  try {
    await ensureDir(app.path('dist'))
    await writeJson(app.path('dist', 'hmr.json'), contents)
  } catch (error) {
    throw new Error(error)
  }

  return stats
}
