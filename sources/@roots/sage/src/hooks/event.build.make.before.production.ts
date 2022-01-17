import {Bud} from '@roots/bud'

/**
 * event.build.make.before hook handler
 *
 * @remarks
 * ran in development mode
 *
 * @public
 */
export async function eventBuildMakeBeforeProduction(app: Bud) {
  app.extensions.get('@roots/bud-entrypoints').setOption('publicPath', '')

  return app
}
