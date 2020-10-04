import Bud from '../Bud'

const output: Bud.Build.Output = function ({output}) {
  const path = this.hooks.filter(
    'webpack.output.path',
    output.path,
  )

  const publicPath = this.hooks.filter(
    'webpack.output.publicPath',
    output.publicPath,
  )

  const filename = this.hooks.filter(
    'webpack.output.filename',
    this.store['features'].enabled('hash')
      ? `[name].[hash].js`
      : `[name].js`,
  )

  return {
    output: {
      ...output,
      path,
      publicPath,
      filename,
    },
  }
}

export {output as default}
