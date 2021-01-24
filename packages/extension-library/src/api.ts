import {Bud} from '@roots/bud'
import AutoDllPlugin from 'autodll-webpack-plugin'
import {lodash as _} from '@roots/bud-support'

export const library: Bud.Library.Configure = function (
  modules,
) {
  this.extensions.add('autodll-webpack-plugin', {
    options: (app: Bud) => ({
      debug: false,
      inject: false,
      filename: app.options.enabled('hash')
        ? '[name].[hash].js'
        : '[name].js',
      entry: {
        library: _.isString(modules) ? [modules] : modules,
      },
      path: 'dll',
      inherit: false,
      context: app.project(),
    }),
    make: (opts: Bud.Module.Options) =>
      new AutoDllPlugin(opts.all()),
  })

  return this
}
