import Bud from './../Bud'

const entry: Bud.Build.Entry = function () {
  return this.hooks.filter('webpack.entry', {
    entry: this.store['webpack'].get('entry'),
  })
}

export {entry as default}
