import {Extension} from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import eventCompilerStats from './hooks/event.compiler.stats'
import * as ThemeJSON from './theme/extension'

/**
 * Sage preset
 *å
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
     * Add theme.json generator support
     */
    await app.extensions.add(ThemeJSON)

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
     * Application paths
     */
    app.setPath({src: 'resources', dist: 'public'})

    /**
     * Application aliases
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
      () => {
        app.devtool()

        app.hooks.async(
          'event.compiler.stats',
          eventCompilerStats.bind(app),
        )

        app.hooks.on('event.app.close', eventAppClose.bind(app))
      },
    )
  },
}
