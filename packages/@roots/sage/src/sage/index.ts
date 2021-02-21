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
import cssnano from 'cssnano'

/**
 * Sage - tailwind preset
 */
export const sage: Bud = ((sage: Bud) => {
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
    .when(
      ({env}: Bud) => env.has('APP_PUBLIC_PATH'),
      ({publicPath, env}: Bud) =>
        publicPath(env.get('APP_PUBLIC_PATH')),
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
     * Thus, Sage uses esbuild in production, and babel/hmr in development.
     */
    .when(
      ({isDevelopment}) => isDevelopment,
      ({use}: Bud) => use(typescript).use(babel).use(react),
      ({use}: Bud) => use(esbuild).esbuild.jsx(),
    )

  sage
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
     * Production optimizations
     */
    .when(
      ({isProduction}) => isProduction,
      ({sequence}: Bud) =>
        sequence([
          ({use}) => use(imagemin),
          ({postcss}) =>
            postcss.setPlugin([
              'cssnano',
              cssnano({preset: 'default'}),
            ]),
          ({minify, hash, vendor, runtime}) =>
            minify() && hash() && vendor() && runtime(),
        ]),
      ({sequence}: Bud) =>
        sequence([
          ({env, proxy}: Bud) =>
            env.has('APP_PROXY_HOST') &&
            proxy({host: env.get('APP_PROXY_HOST')}),
          ({env, proxy}: Bud) =>
            env.has('APP_PROXY_PORT') &&
            proxy({port: sage.env.get('APP_PROXY_PORT')}),
        ]),
    )

  return sage
})(bud)
