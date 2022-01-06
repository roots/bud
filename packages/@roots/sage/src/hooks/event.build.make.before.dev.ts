import {Bud} from '@roots/bud'

/**
 * event.build.make.before hook handler
 *
 * @remarks
 * ran in development mode
 *
 * @public
 */
export async function eventBuildMakeBeforeDevelopment(app: Bud) {
  const url = app.store.get('server.dev.url')
  url.pathname = app.hooks.filter('build.output.publicPath')
  app.extensions
    .get('@roots/bud-entrypoints')
    .setOption('publicPath', url.href)

  return app
}
