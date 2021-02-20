import {Bud} from '@roots/bud'
import AutoDllPlugin from 'autodll-webpack-plugin'

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
        library:
          typeof modules == 'string' ? [modules] : modules,
      },
      path: 'dll',
      inherit: false,
      context: app.project(),
    }),
    make: opts => new AutoDllPlugin(opts.all()),
  })

  return this
}
