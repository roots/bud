export const externals: Framework.API.Externals = function (
  externals,
) {
  this.config.mutate('externals', configExternals => ({
    ...configExternals,
    ...externals,
  }))

  return this
}
