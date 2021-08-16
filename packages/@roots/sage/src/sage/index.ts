import * as Eslint from '@roots/bud-eslint'
import type {Module} from '@roots/bud-framework'
import * as PresetWordPress from '@roots/bud-preset-wordpress'
import * as Stylelint from '@roots/bud-stylelint'
import * as TailwindCss from '@roots/bud-tailwindcss'

interface sage extends Module {}

const sage: sage = {
  name: '@roots/sage',

  boot(app) {
    app
      .use([PresetWordPress, Eslint, Stylelint, TailwindCss])

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
          app.minimize().hash().splitChunks().runtime('single'),
        app => app.proxy().devtool(),
      )
  },
}

export {sage}
