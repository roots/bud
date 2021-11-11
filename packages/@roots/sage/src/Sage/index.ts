import type {Sage as Preset} from './sage.interface'

/**
 * Sage preset configuration for bud.js
 *
 * @example
 * ```ts
 * await app.use(require('@roots/sage')
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
   * Boot event callback
   *
   * @public
   */
  boot: async app => {
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
      .provide({$: ['jquery'], jQuery: ['jquery']})
      .when(
        app.isProduction,
        app => app.minimize().hash().runtime('single'),
        app => app.devtool(),
      )
  },
}
