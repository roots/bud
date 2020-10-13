export const gzip: Api.Gzip = function (options?) {
  this.features.enable('gzip')

  options && this.extensions.setOptions('gzip', options)

  return this
}
