export const gzip: Framework.API.Gzip = function (
  options?: any,
) {
  this.features.enable('gzip')

  options &&
    this.extensions
      .get('compression-webpack-plugin[gzip]')
      .all(options)

  return this
}
