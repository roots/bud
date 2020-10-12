export const alias: API.Alias = function (aliases) {
  this.build.config.merge('resolve.alias', aliases)

  return this
}
