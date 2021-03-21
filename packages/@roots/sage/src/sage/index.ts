import {Sage} from './interface'

import {bud} from '@roots/bud'
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

const fallback = (obj, key, fall) =>
  obj.has(key) ? obj.get(key) : fall

/**
 * @module Sage
 */
export {sage, Sage}

/**
 * @const sage
 * @typedef Sage
 */
const sage: Sage = bud

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
    ({env}: Sage) => env.has('APP_PUBLIC_PATH'),
    ({publicPath, env}: Sage) =>
      publicPath(env.get('APP_PUBLIC_PATH')),
    ({publicPath}) => publicPath('public/'),
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
   * - [Related](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
   *
   * Losing hmr in development is not worth the theoretical
   * lost time in dev, for most users.
   *
   * Thus, Sage uses esbuild in production, and babel in development.
   */
  .when(
    ({mode, util}) => util._.isEqual(mode, 'development'),
    ({use}: Sage) => use([typescript, babel, react]),
    ({use}: Sage) => use([esbuild]).esbuild.jsx(),
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
  .provide({jquery: ['$', 'jQuery']})

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
    ({dev, env}: Sage) => {
      dev({
        host: fallback(env, 'APP_HOST', 'localhost'),
        port: fallback(env, 'APP_PORT', 3000),
      })
        .proxy({
          host: fallback(env, 'APP_PROXY_HOST', 'localhost'),
          port: fallback(env, 'APP_PROXY_PORT', 8000),
        })
        .devtool('eval')
    },
  )
  .html({enabled: false})
