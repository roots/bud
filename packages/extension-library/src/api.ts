import AutoDllPlugin from 'autodll-webpack-plugin'
import {Bud} from '@roots/bud'
import {Module} from '@roots/bud-typings'

export const library: Bud.Library.Configure = function (
  modules,
) {
  this.use([
    [
      'autodll-webpack-plugin',
      {
        options: (app: Bud) => ({
          debug: false,
          inject: false,
          filename: app.options.enabled('hash')
            ? '[name].[hash].js'
            : '[name].js',
          entry: {
            library:
              modules ??
              Array.isArray(app.options.get('library'))
                ? app.options.get('library')
                : [],
          },
          path: 'dll',
          inherit: false,
          context: app.project(),
        }),
        make: (opts: Module.Options) =>
          new AutoDllPlugin(opts.all()),
      },
    ],
  ])

  return this
}
