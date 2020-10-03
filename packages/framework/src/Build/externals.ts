import Bud from './../Bud'

const externals: Bud.Build.Externals = function () {
  return this.hooks.filter('webpack.externals', {
    externals: this.store['webpack'].get('externals'),
  })
}

export {externals as default}
