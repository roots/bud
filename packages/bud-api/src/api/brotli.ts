export const brotli: Framework.API.Brotli = function (
  this: Framework.Bud,
  options,
) {
  this.features.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin[brotli]')
    .all(options)

  return this
}
