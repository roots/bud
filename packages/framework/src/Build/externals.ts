import type Bud from '../Bud'

const externals: Bud.Build.Externals = function (webpack) {
  return {
    externals: this.hooks.filter(
      'webpack.externals',
      webpack.externals,
    ),
  }
}

export {externals as default}
