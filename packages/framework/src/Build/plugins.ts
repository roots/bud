import Bud from './../Bud'

const plugins: Bud.Build.Plugins = function () {
  return {
    plugins: this.hooks.filter(
      'webpack.plugins',
      this.store['plugins']
        .entries()
        .map(([, plugin]) => this.extension.make(plugin)),
    ),
  }
}

export {plugins as default}
