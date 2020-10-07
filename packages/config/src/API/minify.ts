export const minify: API.Minify = function () {
  this.store['features'].enable('minify')

  return this
}
