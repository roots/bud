import Bud from '@roots/bud-types'

const externals: Bud.Build.Externals = bud =>
  bud.hooks.filter('webpack.externals', {
    externals: bud.options.get('webpack.externals'),
  })

export {externals as default}
