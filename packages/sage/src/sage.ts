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
import * as terser from '@roots/bud-terser'

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
     * Sass
     */
    sass,

    /**
     * JSX/react
     */
    react,

    /**
     * entrypoints.json
     */
    entrypoints,
  ])

  /**
   * Production extensions
   */
  .when(sage.isProduction, () => {
    sage.use([dependencies, externals, manifests, terser])
    sage.minify()
    sage.hash()
    sage.vendor()
    sage.runtime()
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

export {sage}
