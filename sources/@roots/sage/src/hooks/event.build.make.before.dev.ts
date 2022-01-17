import {Bud} from '@roots/bud'

/**
 * event.build.make.before hook handler
 *
 * @remarks
 * ran in development mode
 *
 * @public
 */
export async function eventBuildMakeBeforeDevelopment(this: Bud) {
  const devUrl = `${
    this.store.get('server.dev.url').origin
  }${this.hooks.filter('build.output.publicPath')}`

  this.extensions
    .get('@roots/bud-entrypoints')
    .setOption('publicPath', devUrl)

  return this
}
