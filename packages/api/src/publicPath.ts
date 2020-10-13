export const publicPath: Api.PublicPath = function (path) {
  this.build.config.set('output.publicPath', path)

  return this
}
