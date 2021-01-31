/**
 * Sage - Tailwind preset
 */

// Core
import {bud as sage} from '@roots/bud'

// Extensions
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as sass from '@roots/bud-sass'
import * as react from '@roots/bud-react'
import * as imagemin from '@roots/bud-imagemin'
import * as terser from '@roots/bud-terser'
import * as eslint from '@roots/bud-eslint'
import * as prettier from '@roots/bud-prettier'
import * as stylelint from '@roots/bud-stylelint'
import * as tailwindcss from '@roots/bud-tailwindcss'
import * as entrypoints from '@roots/bud-entrypoints'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'

/**
 * Sage WordPress starter theme
 */
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
   * Proxy host
   */
  .when(sage.env.has('APP_PROXY_HOST'), () =>
    sage.proxy({host: sage.env.get('APP_PROXY_HOST')}),
  )

  /**
   * Proxy port
   */
  .when(sage.env.has('APP_PROXY_PORT'), () =>
    sage.proxy({port: sage.env.get('APP_PROXY_PORT')}),
  )

/**
 * Extensions
 */
sage
  .use([
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
   * Webpack aliases
   */
  .alias({
    '@fonts': 'fonts',
    '@images': 'images',
    '@scripts': 'scripts',
    '@styles': 'styles',
    '@svg': 'svg',
  })

/**
 * Production optim
 */
sage.isProduction &&
  sage.use([imagemin, terser]).minify().hash().vendor().runtime()

export {sage}
