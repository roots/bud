import AutoDllPlugin from 'autodll-webpack-plugin'
import {Framework} from '@roots/bud-typings'

export const library: Framework.Library = function (modules) {
  this.use([
    [
      'autodll-webpack-plugin',
      {
        options: () => ({
          debug: false,
          inject: false,
          filename: '[name].[hash].js',
          entry: {
            library: modules,
          },
          path: 'dll',
          inherit: false,
          context: this.src(),
        }),
        make: opts => new AutoDllPlugin(opts.all()),
      },
    ],
  ])

  return this
}
