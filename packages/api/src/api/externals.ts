export const externals: Framework.API.Externals = function (
  externals,
) {
  this.build.config.mutate('externals', configExternals => ({
    ...configExternals,
    ...externals,
  }))

  return this
}
