export const brotli: Api.Brotli = function (options) {
  this.features.set('brotli', true)

  if (!options) return

  this.plugins.setOptions('brotli', options)

  return this
}
