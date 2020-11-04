import {lodash as _} from '@roots/bud-support'
import AutoDllPlugin from 'autodll-webpack-plugin'

export const library: Framework.API.Library = function (
  this: Framework.Bud,
  modules: string[],
) {
  this.use([
    [
      'dll',
      {
        make: () =>
          new AutoDllPlugin({
            inject: true,
            filename: '[name].[hash].js',
            entry: {
              library: modules,
            },
            path: 'dll',
            inherit: true,
            context: this.project(),
          }),
      },
    ],
  ])

  return this
}
