import Bud from '@roots/bud-types'

const resolve: Bud.Build.Resolve = bud =>
  bud.hooks.filter('webpack.resolve', {
    resolve: {
      ...(bud.options.get('webpack.resolve.alias')
        ? {
            alias: bud.hooks.filter(
              'webpack.resolve.alias',
              bud.options.get('webpack.resolve.alias'),
            ),
          }
        : []),

      extensions: bud.hooks.filter(
        'webpack.resolve.extensions',
        [...bud.options.get('webpack.resolve.extensions')],
      ),

      modules: bud.hooks.filter('webpack.resolve.modules', [
        bud.fs.get('src'),
        'node_modules',
      ]),
    },
  })

export default resolve
