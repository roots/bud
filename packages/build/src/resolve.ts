import Bud from '@roots/bud-types'

const resolve: Bud.Build.Resolve = function (this: Bud) {
  return this.hooks.filter('webpack.resolve', {
    resolve: {
      ...(this.store['webpack'].get('resolve.alias')
        ? {
            alias: this.hooks.filter(
              'webpack.resolve.alias',
              this.store['webpack'].get('resolve.alias'),
            ),
          }
        : []),

      extensions: this.hooks.filter(
        'webpack.resolve.extensions',
        [...this.store['webpack'].get('resolve.extensions')],
      ),

      modules: this.hooks.filter('webpack.resolve.modules', [
        this.store['paths'].get('src'),
        'node_modules',
      ]),
    },
  })
}

export {resolve as default}
