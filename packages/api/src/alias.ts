export const alias: Api.Alias = function (aliases) {
  this.build.config.merge('resolve.alias', aliases)

  return this
}
