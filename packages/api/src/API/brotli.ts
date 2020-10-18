export const brotli: Framework.API.Brotli = function (
  this: Framework.Bud,
  options,
) {
  this.features.set('brotli', true)

  if (!options) return

  this.plugins.setOptions('brotli', options)

  return this
}
