export const output: Framework.Build.Output = function ({
  output,
}: Partial<Framework.Build.Configuration>) {
  const path = this.hooks.filter(
    'build.output.path',
    output.path,
  )

  const publicPath = this.hooks.filter(
    'build.output.publicPath',
    output.publicPath,
  )

  const filename = this.hooks.filter(
    'build.output.filename',
    this.features.enabled('hash')
      ? `[name].[hash].js`
      : `[name].js`,
  )

  return {
    output: {
      path,
      publicPath,
      filename,
    },
  }
}
