import {Sage} from './interface'
import {curryConditionalChecks} from './util'

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
export const sage: Sage.Preset = sage => {
  /**
   * Curry utils
   */
  const [checkDeps, project] = curryConditionalChecks(sage)

  /**
   * @const {Sage} sage
   */
  sage
    /**
     * Artifacts/cache store
     *
     * Defer to env setting, if present.
     */
    .when(
      ({env}: Sage) => !env.has('APP_STORAGE'),
      ({storage}: Sage) => storage('storage/bud'),
    )

    /**
     * Src path
     *
     * Defer to env setting, if present.
     */
    .when(
      ({env}: Sage) => !env.has('APP_SRC'),
      ({srcPath}: Sage) => srcPath('resources'),
    )

    /**
     * Dist path
     *
     * Defer to env setting, if present.
     */
    .when(
      ({env}: Sage) => !env.has('APP_DIST'),
      ({distPath}: Sage) => distPath('public'),
    )

    /**
     * Public path
     *
     * Defer to env setting, if present.
     */
    .when(
      ({env}: Sage) => !env.has('APP_PUBLIC_PATH'),
      ({publicPath}: Sage) => publicPath('public/'),
    )

    /**
     * Webpack path Aliases
     */
    .alias({
      '@fonts': 'fonts',
      '@images': 'images',
      '@scripts': 'scripts',
      '@styles': 'styles',
    })

    /**
     * Use relative stylesheet URL imports
     */
    .config({css: {relativeUrls: true}})

    /**
     * Disable generation of HTML template
     */
    .html({enabled: false})

    /**
     * Webpack provide
     */
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
      // If building for dev..
      ({isDevelopment}: Sage) => isDevelopment,

      // ...use extensions supporting HMR
      ({use}: Sage) => {
        // Always use babel to transpile JS
        use(babel)

        // Conditionally support typescript
        checkDeps(['typescript']) && use(typescript)

        // Conditionally support react
        checkDeps(['react']) && use(react)
      },

      // ..otherwise, just use esbuild
      ({use}: Sage) => use([esbuild]).esbuild.jsx(),
    )

    /**
     * Conditionally support postcss
     */
    .when(checkDeps(['postcss']), ({use}: Sage) => use(postcss))

    /**
     * Conditionally support tailwindcss
     */
    .when(checkDeps(['tailwindcss']), ({use}: Sage) =>
      use(tailwindcss),
    )

    /**
     * Conditionally support eslint
     */
    .when(project.has('.eslintrc.js'), ({use}: Sage) =>
      use(eslint),
    )

    /**
     * Conditionally support stylelint
     */
    .when(project.has('.stylelintrc'), ({use}: Sage) =>
      use(stylelint),
    )

    /**
     * Conditionally support prettier
     */
    .when(project.has('.prettierrc'), ({use}: Sage) =>
      use(prettier),
    )

    /**
     * Generate asset manifests
     */
    .use([entrypoints, dependencies, externals, manifests])

    /**
     * Environment specific config & optimization
     */
    .when(
      // Is production?
      ({isProduction}: Sage) => isProduction,

      // Apply in production
      (sage: Sage) =>
        sage.minify().hash().vendor().runtime('single'),

      // Apply in development
      (sage: Sage) => sage.proxy().devtool('eval'),
    )

  return sage
}
