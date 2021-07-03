import * as Babel from '@roots/bud-babel'
import * as Entrypoints from '@roots/bud-entrypoints'
import * as Eslint from '@roots/bud-eslint'
import * as PostCss from '@roots/bud-postcss'
import * as React from '@roots/bud-react'
import * as Tailwind from '@roots/bud-tailwindcss'
import * as WordPressExternals from '@roots/bud-wordpress-externals'
import * as WordPressManifests from '@roots/bud-wordpress-manifests'
import * as WordPressDependencies from '@roots/bud-wordpress-dependencies'

import type {Sage} from './interface'

export const sage: Sage = {
  name: '@roots/sage',

  boot: app => {
    app
      .use([
        Babel,
        PostCss,
        Eslint,
        React,
        Tailwind,
        Entrypoints,
        WordPressDependencies,
        WordPressExternals,
        WordPressManifests,
      ])

      .setPath({
        storage: 'storage/bud',
        src: 'resources',
        dist: 'public',
      })

      .setPublicPath('public/')

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
