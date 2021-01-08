import {Framework, Webpack} from '@roots/bud-typings'

export type Output = Webpack.Configuration['output']

export namespace Output {
  export type Build = (this: Framework) => {output: Output}
}

export const output: Output.Build = function () {
  const path = this.hooks.filter<Output['path']>(
    'webpack.output.path',
    this.store.get('webpack.output.path'),
  )

  const publicPath = this.hooks.filter<Output['publicPath']>(
    'webpack.output.publicPath',
    this.store.get('webpack.output.publicPath'),
  )

  const filename = this.hooks.filter<Output['filename']>(
    'webpack.output.filename',
    this.store.enabled('features.hash')
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
