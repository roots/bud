export const terser: Framework.API.Terser = function (options) {
  if (options) {
    this.extensions.setOptions('terser', options)
  }

  return this
}
