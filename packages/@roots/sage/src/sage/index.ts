import {Sage, SagePreset} from './interface'
import {dependencyConditional} from './util'

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
 * Sage theme preset
 */
export const sage: SagePreset = (sage: Sage): Sage => {
  /**
   * Bind utility function for checking if a project
   * is utilizing specific, heavier dependencies.
   */
  const dependsOn = dependencyConditional.bind(sage)

  /**
   * Disk locations
   */
  sage
    /** Artifacts/cache store */
    .when(
      ({env}) => !env.has('APP_STORAGE'),
      ({storage}) => storage('storage/bud'),
    )

    /** Src path */
    .when(
      ({env}) => !env.has('APP_SRC'),
      ({srcPath}) => srcPath('resources'),
    )

    /** Dist path */
    .when(
      ({env}) => !env.isString('APP_DIST'),
      ({distPath}) => distPath('public'),
    )

    /** Public path */
    .when(
      ({env}) => !env.has('APP_PUBLIC_PATH'),
      ({publicPath}) => publicPath('public/'),
    )

    /** Webpack aliases */
    .alias({
      '@fonts': 'fonts',
      '@images': 'images',
      '@scripts': 'scripts',
      '@styles': 'styles',
    })

    /** Use relative stylesheet URL imports */
    .config({css: {relativeUrls: true}})

    /** Disable generation of HTML template */
    .html({enabled: false})

    /** Webpack provide */
    .provide({jquery: ['$', 'jQuery']})

    /**
     * ESBuild doesn't support HMR. it is purely a transpiler.
     *
     * - snowpack & vite each have their own HMR solutions.
     * - snowpack published [this proposal](https://git.io/JYUVM)
     * - [Related](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
     *
     * Losing HMR in dev is not worth the ESBuild advantages.
     * Thus, Sage uses esbuild in production, and babel in development.
     */
    .when(
      // Check if building for dev..
      ({isDevelopment}) => isDevelopment,

      // ..if so, use these extensions
      ({use}: Sage) => {
        use([
          // Conditionally support typescript
          ...(dependsOn(['typescript'])
            ? [babel, typescript]
            : [babel]),

          // Conditionally support react
          ...(dependsOn(['react']) ? [react] : []),
        ])
      },

      // ..otherwise, just use esbuild
      ({use}: Sage) => use([esbuild]).esbuild.jsx(),
    )

    /** Additional extensions */
    .use([
      // CSS transpilation
      postcss,
      tailwindcss,

      // Linting
      eslint,
      stylelint,
      prettier,

      // Manifest generation
      entrypoints,
      dependencies,
      externals,
      manifests,
    ])

  /**
   * Env specific build config
   */
  sage.when(
    // Is production?
    ({isProduction}) => isProduction,

    // Apply in production
    sage => sage.minify().hash().vendor().runtime('single'),

    // Apply in development
    sage => sage.proxy().devtool('eval'),
  )

  return sage
}
