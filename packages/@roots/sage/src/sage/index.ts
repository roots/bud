import * as BudEslintExtension from '@roots/bud-eslint'
import type {Extension} from '@roots/bud-framework'
import * as PresetWordPress from '@roots/bud-preset-wordpress'
import * as BudStylelintExtension from '@roots/bud-stylelint'
import * as BudTailwindCssExtension from '@roots/bud-tailwindcss'

/**
 * Sage extension interface
 *
 * @public
 */
export interface Sage extends Extension.Module {}

/**
 * Sage preset
 *
 * @public @config
 */
export const Sage: Sage = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.name}
   *
   * @public
   */
  name: '@roots/sage',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.register}
   *
   * @public
   */
  register(app) {
    app.use([
      PresetWordPress,
      BudEslintExtension,
      BudStylelintExtension,
      BudTailwindCssExtension,
    ])
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.boot}
   *
   * @public
   */
  boot(app) {
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
        app =>
          app.pipe([
            app => app.minimize(),
            app => app.hash(),
            app => app.splitChunks(),
            app => app.runtime('single'),
          ]),
        app =>
          app.pipe([app => app.proxy(), app => app.devtool()]),
      )
  },
}
