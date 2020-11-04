export const publicPath: Framework.API.PublicPath = function (
  path,
) {
  this.build.config.set('output.publicPath', path)

  return this
}
