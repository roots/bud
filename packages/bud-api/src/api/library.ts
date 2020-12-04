import {Bud} from '@roots/bud-typings'
import AutoDllPlugin from 'autodll-webpack-plugin'

export const library: Library = function (modules) {
  this.extensions.set('autodll-webpack-plugin', {
    options: {
      debug: false,
      inject: false,
      filename: '[name].[hash].js',
      entry: {
        library: modules,
      },
      path: 'dll',
      inherit: false,
      context: this.src(),
    },
    make: opts => new AutoDllPlugin(opts.all()),
  })

  return this
}

export type Library<T = Bud.Contract> = (
  this: T,
  modules: string[],
) => T
