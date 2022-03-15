import * as Framework from '@roots/bud-framework'
import {join} from 'node:path'

import eventAppClose from './hooks/event.app.close'
import eventCompilerDone from './hooks/event.compiler.done'
import * as ThemeJSON from './theme/extension'

interface Sage extends Framework.Extension.Module {}

/**
 * Sage preset
 *
 * @public
 */
const Sage: Sage = {
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
        ? join(`images`, app.store.get('hashFormat')).concat('[ext]')
        : join(`images`, app.store.get('fileFormat')).concat('[ext]'),
    }))

    /**
     * Application paths
     */
    app.setPath({
      '@src': 'resources',
      '@dist': 'public',
    })

    /**
     * Application aliases
     */
    app.alias({
      '@fonts': join('resources', 'fonts'),
      '@images': join('resources', 'images'),
      '@scripts': join('resources', 'scripts'),
      '@styles': join('resources', 'styles'),
      '@views': join('resources', 'views'),
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
        app
          .devtool()
          .hooks.action('event.compiler.done', eventCompilerDone)
          .hooks.action('event.app.close', eventAppClose)
      },
    )
  },
}

export {Sage as default}
