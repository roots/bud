import {Bud} from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import eventCompilerDone from './hooks/event.compiler.done'

/**
 * Acorn compatibility layer
 * @public
 */
export const makeAcornCompat = (app: Bud) => {
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
   * Tell Acorn assets have no `publicPath` even if bud is using one internally.
   * Acorn does its own `pulicPath` processing.
   *
   * Not setting an empty string will likely result in duplicative path segments
   * and unresolved assets.
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
