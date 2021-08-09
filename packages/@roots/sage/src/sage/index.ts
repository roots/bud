import * as Eslint from '@roots/bud-eslint'
import * as PresetWordPress from '@roots/bud-preset-wordpress'
import * as Stylelint from '@roots/bud-stylelint'
import * as Tailwind from '@roots/bud-tailwindcss'

import type {Sage} from './interface'

export const sage: Sage = {
  name: '@roots/sage',

  boot: app => {
    app
      .use([PresetWordPress, Eslint, Stylelint, Tailwind])

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
