import {Bud} from '@roots/bud'
import {Module} from '@roots/bud-framework'

import * as babel from '@roots/bud-babel'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as entrypoints from '@roots/bud-entrypoints'
import * as esbuild from '@roots/bud-esbuild'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'
import * as postcss from '@roots/bud-postcss'
import * as react from '@roots/bud-react'
import * as tailwind from '@roots/bud-tailwindcss'
import * as typescript from '@roots/bud-typescript'

export const name: Module.Name = '@roots/sage'

export const boot: Module.Boot = (app: Bud) => {
  app
    .setPath({
      storage: app.env.get('APP_STORAGE') ?? 'storage/bud',
      src: app.env.get('APP_SRC') ?? 'resources',
      dist: app.env.get('APP_DIST') ?? 'public',
      publicPath: app.env.get('APP_PUBLIC_PATH') ?? 'public/',
    })
    .alias({
      '@fonts': app.path('src', 'fonts'),
      '@images': app.path('src', 'images'),
      '@scripts': app.path('src', 'scripts'),
      '@styles': app.path('src', 'styles'),
    })
    .html({enabled: false})
    .provide({jquery: ['$', 'jQuery']})

  /**
   * Conditionals
   */
  app
    .use([
      postcss,
      tailwind,
      entrypoints,
      dependencies,
      externals,
      manifests,
    ])

    /**
     * Transpiler and extensions
     *
     * ESBuild doesn't support HMR. It is purely a transpiler.
     *
     * - snowpack & vite each have their own HMR solutions.
     * - snowpack published [this proposal](https://git.io/JYUVM)
     * - [Related](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
     *
     * Losing HMR in dev is not worth the ESBuild advantages.
     * Thus, app uses esbuild in production, and babel in development.
     */
    .when(
      app.isProduction,
      () =>
        app
          .use(esbuild)
          .minimize()
          .hash()
          .splitChunks()
          .runtime('single'),

      () =>
        app.use([babel, react, typescript]).proxy().devtool(),
    )
}
