import {Sage} from './interface'

import * as babel from '@roots/bud-babel'
import * as entrypoints from '@roots/bud-entrypoints'
import * as eslint from '@roots/bud-eslint'
import * as postcss from '@roots/bud-postcss'

import * as react from '@roots/bud-react'
import * as tailwind from '@roots/bud-tailwindcss'

import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'
import * as dependencies from '@roots/bud-wordpress-dependencies'

export const sage: Sage = {
  name: '@roots/sage',

  boot: app => {
    app
      .use([
        babel,
        postcss,
        eslint,
        react,
        tailwind,
        entrypoints,
        dependencies,
        externals,
        manifests,
      ])

      .setPath({
        storage: app.env.get('APP_STORAGE') ?? 'storage/bud',
        src: app.env.get('APP_SRC') ?? 'resources',
        dist: app.env.get('APP_DIST') ?? 'public',
      })

      .setPublicPath(app.env.get('APP_PUBLIC_PATH') ?? 'public/')

      .alias({
        '@fonts': app.path('src', 'fonts'),
        '@images': app.path('src', 'images'),
        '@scripts': app.path('src', 'scripts'),
        '@styles': app.path('src', 'styles'),
      })

      .template({enabled: false})

      .provide({jquery: ['$', 'jQuery']})

      .when(
        ({isProduction}) => isProduction,
        app =>
          app.minimize().hash().splitChunks().runtime('single'),
        app => app.proxy().devtool(),
      )
  },
}
