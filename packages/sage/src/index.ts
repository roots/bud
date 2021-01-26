import {Bud} from './interface'

import {bud as sage} from '@roots/bud'
import * as entrypoints from '@roots/bud-entrypoints'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as externals from '@roots/bud-wordpress-externals'
import * as manifests from '@roots/bud-wordpress-manifests'
import * as eslint from '@roots/bud-eslint'
import * as babel from '@roots/bud-babel'
import * as sass from '@roots/bud-sass'
import * as react from '@roots/bud-react'
import * as terser from '@roots/bud-terser'

/**
 * Artifacts/cache store in Acorn standard location
 */
sage.storage('storage/bud')

/**
 * Sage src path
 */
sage.srcPath('resources/assets')

/**
 * Sage public path:
 * - check env first
 * - fallback to Bedrock standard
 */
sage.when(
  sage.env.has('APP_PUBLIC'),
  () => sage.publicPath(sage.env.get('APP_PUBLIC')),
  () => sage.publicPath('/app/themes/sage/dist/'),
)

/**
 * Proxy host & port
 */
sage
  .when(sage.env.has('APP_PROXY_HOST'), () =>
    sage.proxy({host: sage.env.get('APP_PROXY_HOST')}),
  )
  .when(sage.env.has('APP_PROXY_PORT'), () =>
    sage.proxy({port: sage.env.get('APP_PROXY_PORT')}),
  )

/**
 * Sage extensions
 */
sage.use([
  /**
   * entrypoints.json
   */
  entrypoints,
  /**
   * Mark wp window vars as externals
   */
  externals,
  /**
   * Generate wordpress.json detailing utilized wp externals
   */
  dependencies,
  /**
   * Merge entrypoints.json and wordpress.json under entrypoints.json
   */
  manifests,
  /**
   * Add eslint support
   */
  eslint,
  /**
   * Add babel transpiler support
   */
  babel,
  /**
   * Add sass support
   */
  sass,
  /**
   * Add JSX/react support
   */
  react,
])

/**
 * Sage webpack aliases
 */
sage.alias({
  '@scripts': 'scripts',
  '@styles': 'styles',
  '@fonts': 'fonts',
  '@images': 'images',
})

/**
 * When in production:
 *
 * - use terser
 * - minify assets
 * - hash asset names
 * - split vendored code
 * - split runtime
 */
sage.when(sage.isProduction, ({sequence}: Bud) =>
  sequence([
    () => sage.use(terser),
    () => sage.minify(),
    () => sage.hash(),
    () => sage.vendor(),
    () => sage.runtime(),
  ]),
)

/**
 * Sage theme
 */
export {sage, sage as default}
