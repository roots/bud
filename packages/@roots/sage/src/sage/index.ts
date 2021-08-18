import * as BudEslintExtension from '@roots/bud-eslint'
import type {Module} from '@roots/bud-framework'
import * as PresetWordPress from '@roots/bud-preset-wordpress'
import * as BudStylelintExtension from '@roots/bud-stylelint'
import * as BudTailwindCssExtension from '@roots/bud-tailwindcss'

interface sage extends Module {}

const sage: sage = {
  name: '@roots/sage',

  boot(app) {
    app
      .use([
        PresetWordPress,
        BudEslintExtension,
        BudStylelintExtension,
        BudTailwindCssExtension,
      ])

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

export {sage}
