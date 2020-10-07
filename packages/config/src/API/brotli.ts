export const brotli: API.Brotli = function (options) {
  this.store['features'].set('brotli', true)

  if (options) {
    this.store['components'].plugins.compression.brotli = options
  }

  return this
}
