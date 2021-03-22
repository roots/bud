import {Sage} from './interface'

import * as babel from '@roots/bud-babel'
import * as esbuild from '@roots/bud-esbuild'
import * as eslint from '@roots/bud-eslint'
import * as postcss from '@roots/bud-postcss'
import * as react from '@roots/bud-react'
import * as tailwindcss from '@roots/bud-tailwindcss'
import * as typescript from '@roots/bud-typescript'
import * as prettier from '@roots/bud-prettier'
import * as stylelint from '@roots/bud-stylelint'
import * as entrypoints from '@roots/bud-entrypoints'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'

/**
 * Receives the normcore bud obj from the sage
 * bin. Preconfigures sage and returns to the
 * CLI.
 */
declare type SagePreset = (sage: Sage) => Sage

/**
 * @module Sage
 */
export {sage, Sage, SagePreset}

const sage: SagePreset = (sage: Sage) =>
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
      ({env}) => !env.has('APP_PUBLIC_PATH'),
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
      stylelint,
      prettier,

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
      // Is production?
      ({isProduction}) => isProduction,

      // Production
      sage => sage.minify().hash().vendor().runtime('single'),

      // Development
      sage => sage.proxy().devtool('eval'),
    )
    .html({enabled: false})
