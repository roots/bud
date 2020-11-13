export const gzip: Framework.API.Gzip = function (
  options?: any,
) {
  this.features.enable('gzip')

  options &&
    (() => {
      const opts = this.extensions
        .get('compression-webpack-plugin-gzip')
        .all()

      this.extensions
        .get('compression-webpack-plugin-gzip')
        .setOptions({
          ...opts,
          ...options,
        })
    })()
  return this
}
