/**
 * Sage - Bootstrap preset
 */

// Core
import {bud, Bud} from '@roots/bud'

// Transpilers
import * as babel from '@roots/bud-babel'
import * as esbuild from '@roots/bud-esbuild'
import * as postcss from '@roots/bud-postcss'
import * as react from '@roots/bud-react'
import * as sass from '@roots/bud-sass'

// Linting
import * as eslint from '@roots/bud-eslint'
import * as prettier from '@roots/bud-prettier'
import * as stylelint from '@roots/bud-stylelint'

// Manifests
import * as entrypoints from '@roots/bud-entrypoints'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'

// Optimization
import * as imagemin from '@roots/bud-imagemin'
import * as purgecss from '@roots/bud-purgecss'

/**
 * Sage WordPress starter theme
 */
export const bootstrap: () => Bud = () => {
  const sage = bud

  sage
    /**
     * Artifacts/cache store
     *
     * Set to Acorn standard location
     */
    .storage('storage/bud')

    /**
     * Src path
     */
    .srcPath('resources/assets')

    /**
     * Public path:
     */
    .when(bud.env.has('APP_PUBLIC_PATH'), () =>
      bud.publicPath(bud.env.get('APP_PUBLIC_PATH')),
    )

    /**
     * Proxy host
     */
    .when(bud.env.has('APP_PROXY_HOST'), () =>
      bud.proxy({host: bud.env.get('APP_PROXY_HOST')}),
    )

    /**
     * Proxy port
     */
    .when(bud.env.has('APP_PROXY_PORT'), () =>
      bud.proxy({port: bud.env.get('APP_PROXY_PORT')}),
    )

    /**
     * ESBuild doesn't support HMR. it is purely a transpiler.
     *
     * - snowpack & vite each have their own HMR solutions.
     * - snowpack provides their solution as an
     *   [ESM spec proposal](https://github.com/snowpackjs/esm-hmr)
     * - [Related article from Dan Abramov](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
     *
     * Losing hmr in development is not worth the theoretical
     * lost time in dev, for most users.
     *
     * Thus, Sage uses esbuild@production, babel/hmr@development.
     */
    .when(
      bud.isDevelopment,
      (bud: Bud) => {
        bud.use(babel)
        bud.use(react)
      },
      (bud: Bud) => {
        bud.use(esbuild)
        bud.esbuild.jsx()
      },
    )

    /**
     * Extensions
     */
    .use([
      /**
       * Style transpilation
       */
      postcss,
      sass,

      /**
       * Linting
       */
      eslint,
      prettier,
      stylelint,

      /**
       * Manifests
       */
      entrypoints,
      dependencies,
      externals,
      manifests,
    ])

    /**
     * Sage webpack aliases
     */
    .alias({
      '@fonts': 'fonts',
      '@images': 'images',
      '@scripts': 'scripts',
      '@styles': 'styles',
    })

    /**
     * Provide vars
     */
    .provide({
      jquery: ['$', 'jQuery'],
    })

  /**
   * Production optim
   */
  sage.when(sage.isProduction, () => {
    sage.use([imagemin, purgecss])

    sage.postcss.addPlugin(
      require('cssNano')({preset: 'default'}),
    )

    sage.minify()
    sage.hash()
    sage.vendor()
    sage.runtime()

    sage.purge({
      content: [
        sage.src('scripts/**/*'),
        sage.project('resources/views/**/*.php'),
        sage.project('app/**/*.php'),
      ],
      css: [sage.src('styles/**/*.{css,scss}')],
      ...require('purgecss-with-wordpress'),
    })
  })

  return sage
}
