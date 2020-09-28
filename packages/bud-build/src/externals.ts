import Bud from '@roots/bud-types'

const externals: Bud.Build.Externals = function (this: Bud) {
  return this.hooks.filter('webpack.externals', {
    externals: this.options.get('webpack.externals'),
  })
}

export {externals as default}
