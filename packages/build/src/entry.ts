import Bud from '@roots/bud-types'

const entry: Bud.Build.Entry = function (this: Bud) {
  return this.hooks.filter('webpack.entry', {
    entry: this.webpack.get('entry'),
  })
}

export {entry as default}
