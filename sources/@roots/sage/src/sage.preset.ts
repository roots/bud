import * as Framework from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import eventCompilerDone from './hooks/event.compiler.done'
import * as ThemeJSON from './theme/extension'

interface Sage extends Framework.Extension.Module {}

/**
 * Acorn compatibility layer
 * @public
 */
const makeAcornCompat = (app: Framework.Framework) => {
  /**
   * Override output directory for svg assets
   * `@roots/bud-build` places them, by default, in `svg/`
   */
  app.build.rules.svg.setGenerator(app => ({
    filename: app.store.is('features.hash', true)
      ? 'images/'.concat(app.store.get('hashFormat')).concat('[ext]')
      : 'images/'.concat(app.store.get('fileFormat')).concat('[ext]'),
  }))

  /**
   * Tell Acorn assets have no `publicPath` even if bud is
   * using one internally. Acorn does its own `pulicPath` processing
   * and not setting an empty string will likely result in duplicative
   * path segments and unresolved assets
   */
  app.extensions.get('@roots/bud-entrypoints').setOption('publicPath', '')

  /**
   * - If publicPath is `/` in production assets will not be locatable by Acorn.
   * - If publicPath is `''` in development bud's dev server will implode.
   * - If publicPath is the actual publicPath acorn will double up the path segments.
   */
  app.hooks.on('build.output.publicPath', app.isDevelopment ? `/` : ``)

  /**
   * Write hmr.json when compilation is finalized (only in development)
   * Remove this file when process is exited.
   */
  app.when(app.isDevelopment, () =>
    app.hooks
      .action('event.compiler.done', eventCompilerDone)
      .hooks.action('event.app.close', eventAppClose),
  )
}

/**
 * Sage preset
 * @public
 */
const Sage: Sage = {
  /**
   * Extension identifier
   * @public
   */
  name: '@roots/sage',

  /**
   * Extension boot
   * @public
   */
  boot: async app => {
    /**
     * Handle acorn compatibility concerns
     */
    makeAcornCompat(app)

    /**
     * Add theme.json generator support
     */
    await app.extensions.add(ThemeJSON)

    /**
     * Set application paths
     */
    app
      .setPath({
        '@src': 'resources',
        '@dist': 'public',
        '@resources': '@src',
        '@public': '@dist',
        '@fonts': '@src/fonts',
        '@images': '@src/images',
        '@scripts': '@src/scripts',
        '@styles': '@src/styles',
        '@views': '@src/views',
      })

      /**
       * Set application client aliases
       */
      .alias({
        '@fonts': app.path('@fonts'),
        '@images': app.path('@images'),
        '@scripts': app.path('@scripts'),
        '@styles': app.path('@styles'),
      })

      /**
       * Create vendor chunk(s)
       */
      .splitChunks()

      /**
       * Environment specific configuration
       */
      .when(
        app.isProduction,
        () => app.minimize().hash().runtime('single'),
        () => app.devtool(),
      )
  },
}

export {Sage as default}
