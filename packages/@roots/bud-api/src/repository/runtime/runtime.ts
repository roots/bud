import {isUndefined} from 'lodash'
import type Webpack from 'webpack'

import type {Repository} from '..'

const DEFAULT_OPTIONS: Webpack.Configuration['optimization']['runtimeChunk'] =
  {
    name: (entrypoint: Webpack.EntryObject) =>
      `runtime/${entrypoint.name}`,
  }

export const runtime: Repository.Runtime = function (runtime?) {
  this.hooks.on('build/optimization/runtimeChunk', () =>
    !isUndefined(runtime) ? runtime : DEFAULT_OPTIONS,
  )

  return this
}
