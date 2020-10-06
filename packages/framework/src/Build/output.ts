import Bud from '../Bud'

const output: Bud.Build.Output = function ({output}) {
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
    this.store['features'].enabled('hash')
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

export {output as default}
