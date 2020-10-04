import Bud from '../Bud'

const plugins: Bud.Build.Plugins = function () {
  return {
    plugins: this.hooks.filter(
      'webpack.plugins',
      this.components['plugins']
        .entries()
        .map(([, plugin]) => this.extensions.make(plugin)),
    ),
  }
}

export {plugins as default}
