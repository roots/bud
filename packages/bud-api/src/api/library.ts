import AutoDllPlugin from 'autodll-webpack-plugin'

export const library: Framework.API.Library = function (
  this: Framework.Bud,
  modules: string[],
) {
  this.extensions.set('autodll-webpack-plugin', {
    options: {
      inject: true,
      filename: '[name].[hash].js',
      entry: {
        library: modules,
      },
      path: 'dll',
      inherit: true,
      context: this.src(),
    },
    make: opts => new AutoDllPlugin(opts.all()),
  })

  return this
}
