export const terser: API.Terser = function (options) {
  if (options) {
    this.store['plugins'].merge('terser', options)
  }

  return this
}
