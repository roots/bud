import {Framework} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

export const library: Framework.Library.Configure = function (
  modules,
) {
  this.extensions.add({
    name: 'autodll-webpack-plugin',
    options: (app: Framework) => ({
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
