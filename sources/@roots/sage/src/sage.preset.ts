import {Extension} from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import eventCompilerStats from './hooks/event.compiler.stats'

/**
 * Sage preset
 *
 * @public
 */
export const Sage: Extension.Module<void> = {
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
  boot: async app => {
    /**
     * Override output directory for svg assets
     * `@roots/bud-build` places them, by default, in `svg/`
     */
    app.build.rules.svg.setGenerator(app => ({
      filename: app.store.is('features.hash', true)
        ? 'images/'.concat(app.store.get('hashFormat')).concat('[ext]')
        : 'images/'.concat(app.store.get('fileFormat')).concat('[ext]'),
    }))

    /**
     * Directory aliases
     */
    app.alias({
      '@fonts': app.path('src', 'fonts'),
      '@images': app.path('src', 'images'),
      '@scripts': app.path('src', 'scripts'),
      '@styles': app.path('src', 'styles'),
    })

    /**
     * Separate vendor code from application
     */
    app.splitChunks()

    /**
     * Production/development configuration
     */
    app.when(
      /**
       * Test for production
       */
      app.isProduction,

      /**
       * Production
       */
      () => app.minimize().hash().runtime('single'),

      /**
       * Development
       */
      ({devtool, hooks, setPublicPath}) => {
        devtool()
        setPublicPath('/')

        hooks.async('event.compiler.stats', eventCompilerStats.bind(app))
        hooks.on('event.app.close', eventAppClose.bind(app))
      },
    )
  },
}
