export const terser: Api.Terser = function (options) {
  if (options) {
    this.extensions.setOptions('terser', options)
  }

  return this
}
