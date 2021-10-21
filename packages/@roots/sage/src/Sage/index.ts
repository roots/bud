import {extensions} from './sage.dependencies'
import type {Sage as Preset} from './sage.interface'

/**
 * Sage preset configuration for bud.js
 *
 * @example
 * ```ts
 * app.use(require('@roots/sage')
 * ```
 *
 * @public @config
 */
export const Sage: Preset = {
  /**
   * Identifier
   *
   * @public
   */
  name: '@roots/sage',

  /**
   * Register event callback
   *
   * @remarks
   * `register` is called first, extensions can be
   * added now so they are available during the `boot` event.
   *
   * @public
   */
  register: app => app.use(extensions),

  /**
   * Boot event callback
   *
   * @public
   */
  boot: app =>
    app
      .setPath({
        storage: 'storage/bud',
        src: 'resources',
        dist: 'public',
      })

      .alias({
        '@fonts': app.path('src', 'fonts'),
        '@images': app.path('src', 'images'),
        '@scripts': app.path('src', 'scripts'),
        '@styles': app.path('src', 'styles'),
      })

      .provide({jquery: ['$', 'jQuery']})

      .when(
        app.isProduction,
        app => app.minimize(true).hash().runtime('single'),
        app => app.proxy().devtool(),
      ),
}
