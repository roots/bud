export const gzip: Framework.API.Gzip = function (options?) {
  this.features.enable('gzip')

  options && this.extensions.setOptions('gzip', options)

  return this
}
