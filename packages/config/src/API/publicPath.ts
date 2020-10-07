export const publicPath: API.PublicPath = function (path) {
  this.store['build'].output.publicPath = path

  return this
}
