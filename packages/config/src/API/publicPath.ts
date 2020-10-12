export const publicPath: API.PublicPath = function (path) {
  this.build.config.output.publicPath = path

  return this
}
