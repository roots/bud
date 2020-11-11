export const publicPath: Framework.API.PublicPath = function (
  path,
) {
  this.config.set('output.publicPath', path)

  return this
}
