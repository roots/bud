import Bud from '@roots/bud-types'

const resolve: Bud.Build.Resolve = function () {
  return this.hooks.filter('webpack.resolve', {
    resolve: {
      ...(this.options.get('webpack.resolve.alias')
        ? {
            alias: this.hooks.filter(
              'webpack.resolve.alias',
              this.options.get('webpack.resolve.alias'),
            ),
          }
        : []),

      extensions: this.hooks.filter(
        'webpack.resolve.extensions',
        [...this.options.get('webpack.resolve.extensions')],
      ),

      modules: this.hooks.filter('webpack.resolve.modules', [
        this.fs.get('src'),
        'node_modules',
      ]),
    },
  })
}

export {resolve as default}
