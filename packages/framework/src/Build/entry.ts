import Bud from '../Bud'

const entry: Bud.Build.Entry = function ({entry}) {
  return {
    entry: this.hooks.filter('webpack.entry', entry),
  }
}

export {entry as default}
