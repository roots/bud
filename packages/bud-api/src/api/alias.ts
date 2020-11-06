export const alias: Framework.API.Alias = function (aliases) {
  this.build.config.merge('resolve.alias', aliases)

  return this
}
