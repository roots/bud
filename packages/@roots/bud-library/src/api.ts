import {Bud} from '@roots/bud'
import AutoDllPlugin from 'autodll-webpack-plugin'

export const library: Bud.Library.Configure = function (
  modules,
) {
  this.extensions.add('autodll-webpack-plugin', {
    name: 'autodll-webpack-plugin',
    options: (app: Bud) => ({
      debug: false,
      inject: false,
      filename: this.store.isTrue('options.hash')
        ? this.store.get('options.hashFormat')
        : this.store.get('options.fileFormat'),
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
