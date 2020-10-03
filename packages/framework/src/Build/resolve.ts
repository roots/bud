import Bud from './../Bud'

const resolve: Bud.Build.Resolve = function (webpack) {
  return this.hooks.filter('webpack.resolve', {
    resolve: {
      ...(webpack.resolve.alias
        ? {
            alias: this.hooks.filter(
              'webpack.resolve.alias',
              webpack.resolve.alias,
            ),
          }
        : []),

      extensions: this.hooks.filter(
        'webpack.resolve.extensions',
        [...webpack.resolve.extensions],
      ),

      modules: this.hooks.filter('webpack.resolve.modules', [
        webpack.resolve.modules ?? webpack.context,
        'node_modules',
      ]),
    },
  })
}

export {resolve as default}
