export const alias: API.Alias = function (aliases) {
  this.store['build'].merge('resolve.alias', aliases)

  return this
}
