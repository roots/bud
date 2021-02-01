/**
 * Sage - Tailwind preset
 */

// Core
import {bud, Bud} from '@roots/bud'

// Transpilers
import * as babel from '@roots/bud-babel'
import * as react from '@roots/bud-react'
import * as postcss from '@roots/bud-postcss'
import * as sass from '@roots/bud-sass'
import * as tailwindcss from '@roots/bud-tailwindcss'

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
import * as terser from '@roots/bud-terser'

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

  sage.use([
    /**
     * Script transpilation
     */
    babel,
    react,

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
  sage.alias({
    '@fonts': 'fonts',
    '@images': 'images',
    '@scripts': 'scripts',
    '@styles': 'styles',
  })

  /**
   * Provide vars
   */
  sage.provide({
    jquery: ['$', 'jQuery'],
  })

  /**
   * Production optim
   */
  sage.when(
    sage.isProduction,

    /**
     * Production concerns.
     */
    () => {
      sage.use([terser, imagemin])

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
    () => {
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
