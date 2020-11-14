import {Bud} from '@roots/bud-typings'
import AutoDllPlugin from 'autodll-webpack-plugin'

export const library = function (
  this: Bud.Contract,
  modules: string[],
): Bud.Contract {
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
