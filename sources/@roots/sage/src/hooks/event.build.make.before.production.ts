/**
 * event.build.make.before hook handler
 *
 * @remarks
 * ran in production mode
 *
 * @public
 */
export async function eventBuildMakeBeforeProduction() {
  this.hooks.on('build.output.publicPath', () => '')
  return this
}
