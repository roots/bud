/**
 * Sage - Tailwind preset
 */

// Core
import {bud, Bud} from '@roots/bud'

// Transpilers
import * as babel from '@roots/bud-babel'
import * as esbuild from '@roots/bud-esbuild'
import * as postcss from '@roots/bud-postcss'
import * as react from '@roots/bud-react'
import * as sass from '@roots/bud-sass'
import * as tailwindcss from '@roots/bud-tailwindcss'
import * as typescript from '@roots/bud-typescript'

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

/**
 * Sage - tailwind preset
 */
export const tailwind: () => Bud = () => {
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
    .srcPath('resources')

    /**
     * Dist path
     */
    .distPath('public')

    /**
     * Public path:
     */
    .when(sage.env.has('APP_PUBLIC_PATH'), () =>
      sage.publicPath(sage.env.get('APP_PUBLIC_PATH')),
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
        bud.use(typescript)
        bud.use(babel)
        bud.use(react)
      },
      (bud: Bud) => {
        bud.use(esbuild)
        bud.esbuild.jsx()
      },
    )

    .use([
      /**
       * Style transpilation
       */
      postcss,
      sass,
      tailwindcss,

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
    .when(
      sage.isProduction,

      /**
       * Production concerns.
       */
      (sage: Bud) => {
        sage.use([imagemin])

        sage.postcss.addPlugin(
          require('cssNano')({preset: 'default'}),
        )

        sage.minify()
        sage.hash()
        sage.vendor()
        sage.runtime()
      },

      /**
       * Development concerns.
       */
      (sage: Bud) => {
        sage
          .when(sage.env.has('APP_PROXY_HOST'), () =>
            sage.proxy({host: sage.env.get('APP_PROXY_HOST')}),
          )
          .when(sage.env.has('APP_PROXY_PORT'), () =>
            sage.proxy({port: sage.env.get('APP_PROXY_PORT')}),
          )
      },
    )

  return sage
}
