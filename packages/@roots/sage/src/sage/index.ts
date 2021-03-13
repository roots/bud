import {bud, Bud} from '@roots/bud'
import * as babel from '@roots/bud-babel'
import * as esbuild from '@roots/bud-esbuild'
import * as postcss from '@roots/bud-postcss'
import * as react from '@roots/bud-react'
import * as tailwindcss from '@roots/bud-tailwindcss'
import * as typescript from '@roots/bud-typescript'
import * as eslint from '@roots/bud-eslint'
import * as prettier from '@roots/bud-prettier'
import * as stylelint from '@roots/bud-stylelint'
import * as entrypoints from '@roots/bud-entrypoints'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'

/**
 * Bud preset: @roots/sage
 */
export type Sage = Bud
export const sage: Sage = (sage =>
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
     * Public path
     */
    .when(
      ({env}: Bud) => env.has('APP_PUBLIC_PATH'),
      ({publicPath, env}: Bud) =>
        publicPath(env.get('APP_PUBLIC_PATH')),
    )

    /**
     * Set CSS urls to be relative
     */
    .config({css: {relativeUrls: true}})

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
      ({use}: Sage) => use(typescript).use(babel).use(react),
      ({use}: Sage) => use(esbuild).esbuild.jsx(),
    )

    /**
     * General extensions
     */
    .use([
      /**
       * Style transpilation
       */
      postcss,
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
     * Provide
     */
    .provide({
      jquery: ['$', 'jQuery'],
    })

    /**
     * Additional options
     */
    .when(
      ({isProduction}) => isProduction,

      /**
       * Production
       */
      (sage: Sage) => {
        sage.minify().hash().vendor().runtime('single')
      },

      /**
       * Development
       */
      ({env, proxy, dev, devtool}) => {
        dev({
          host: env.has('APP_HOST')
            ? env.get('APP_HOST')
            : 'localhost',
          port: env.has('APP_PORT') ? env.get('APP_PORT') : 3000,
        })

        proxy({
          host: env.has('APP_PROXY_HOST')
            ? env.get('APP_PROXY_HOST')
            : 'localhost',
          port: env.has('APP_PROXY_PORT')
            ? env.get('APP_PROXY_PORT')
            : 8000,
        })

        devtool()
      },
    )
    .html(false))(Object.assign(bud, {name: 'sage'}))
