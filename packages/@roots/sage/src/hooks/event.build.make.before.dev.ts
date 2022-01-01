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
  app.extensions
    .get('@roots/bud-entrypoints')
    .setOption(
      'publicPath',
      `${app.store.get('server.dev.url')}${app.hooks.filter(
        'build.output.publicPath',
      )}`,
    )

  return app
}
