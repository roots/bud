import Bud from '../Bud'

const resolve: Bud.Build.Resolve = function (webpack) {
  const alias = this.hooks.filter(
    'webpack.resolve.alias',
    webpack.resolve.alias,
  )

  return {
    resolve: {
      alias,
      extensions: this.hooks.filter(
        'webpack.resolve.extensions',
        webpack.resolve.extensions,
      ),

      modules: this.hooks.filter('webpack.resolve.modules', [
        webpack.resolve.modules ?? webpack.context,
        'node_modules',
      ]),
    },
  }
}

export {resolve as default}
