/**
 * Sage - Base
 */

// Core
import {bud as sage} from '@roots/bud'

// Extensions
import * as entrypoints from '@roots/bud-entrypoints'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'
import * as babel from '@roots/bud-babel'
import * as sass from '@roots/bud-sass'
import * as react from '@roots/bud-react'
import * as imagemin from '@roots/bud-imagemin'
import * as terser from '@roots/bud-terser'
import * as eslint from '@roots/bud-eslint'
import * as prettier from '@roots/bud-prettier'
import * as stylelint from '@roots/bud-stylelint'
import * as postcss from '@roots/bud-postcss'

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
  .srcPath('resources/assets')

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
  .use([
    /**
     * Babel
     */
    babel,

    /**
     * Postcss
     */
    postcss,

    /**
     * Sass
     */
    sass,

    /**
     * JSX/react
     */
    react,

    /**
     * Image minification
     */
    imagemin,

    /**
     * entrypoints.json
     */
    entrypoints,

    /**
     * dependencies
     */
    dependencies,

    /**
     * externals
     */
    externals,

    /**
     * merge wordpress.json with entrypoints.json
     */
    manifests,

    /**
     * Eslint
     */
    eslint,

    /**
     * Prettier
     */
    prettier,

    /**
     * Stylelint
     */
    stylelint,
  ])

  /**
   * Production extensions
   */
  .when(sage.isProduction, () => {
    sage.use([terser])
    sage.minify().hash().vendor().runtime()
  })

  /**
   * Sage webpack aliases
   */
  .alias({
    '@scripts': 'scripts',
    '@styles': 'styles',
    '@fonts': 'fonts',
    '@images': 'images',
  })

  /**
   * Copy images
   */
  .when(
    sage.disk.get('project').has('resources/assets/images'),
    () => sage.copy('images/*'),
  )

  /**
   * Copy fonts
   */
  .when(
    sage.disk.get('project').has('resources/assets/fonts'),
    () => sage.copy('fonts/*'),
  )

  /**
   * Copy svg
   */
  .when(
    sage.disk.get('project').has('resources/assets/svg'),
    () => sage.copy('svg/*'),
  )

  /**
   * Provided libraries
   */
  .provide({
    jquery: ['$', 'jQuery'],
  })

export {sage}
