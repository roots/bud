import {Bud} from '@roots/bud'
import AutoDllPlugin from 'autodll-webpack-plugin'
import {isString} from 'lodash'

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
          modules ?? Array.isArray(app.options.get('library'))
            ? app.options.get('library')
            : isString(modules)
            ? [modules]
            : [],
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
