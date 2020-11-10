export const alias: Framework.API.Alias = function (aliases) {
  this.config.merge('resolve.alias', aliases)

  return this
}
