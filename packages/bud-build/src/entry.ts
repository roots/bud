import Bud from '@roots/bud-types'

const entry: Bud.Build.Entry = bud =>
  bud.hooks.filter('webpack.entry', {
    entry: bud.options.get('webpack.entry'),
  })

export {entry as default}
