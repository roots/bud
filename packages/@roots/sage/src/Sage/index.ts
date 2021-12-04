import {Extension, Framework} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import {URL, urlToHttpOptions} from 'url'

const {pathExistsSync, writeJson, removeSync} = fs

/**
 * Development configuration
 *
 * @param app - bud instance
 */
const inDevelopment = (app: Framework) => {
  app.devtool()

  app.hooks
    .async<'event.compiler.done'>(
      'event.compiler.done',
      async stats => {
        const dev = new URL(app.store.get('server.dev'))
        const proxy = new URL(app.store.get('server.proxy'))

        try {
          await writeJson(app.path('dist', 'hmr.json'), {
            dev: urlToHttpOptions(dev),

            proxy: app.store.is('features.proxy', true)
              ? urlToHttpOptions(proxy)
              : false,
          })
        } catch (error) {
          throw new Error(error)
        }

        return stats
      },
    )
    .hooks.on('event.app.close', () => {
      const path = app.path('dist', 'hmr.json')
      pathExistsSync(path) && removeSync(path)
    })
}

/**
 * Production configuration
 *
 * @param app - bud instance
 */
const inProduction = (app: Framework) => {
  app.minimize().hash().runtime('single')
}

/**
 * Sage preset
 *
 * @public
 */
export const Sage: Extension.Module = {
  /**
   * Extension identifier
   *
   * @public
   */
  name: '@roots/sage',

  /**
   * Extension boot
   *
   * @public
   */
  register: async (app, logger) => {
    app
      .alias({
        '@fonts': app.path('src', 'fonts'),
        '@images': app.path('src', 'images'),
        '@scripts': app.path('src', 'scripts'),
        '@styles': app.path('src', 'styles'),
      })
      .provide({$: ['jquery'], jQuery: ['jquery']})

      .when(app.isProduction, inProduction, inDevelopment)
  },
}
