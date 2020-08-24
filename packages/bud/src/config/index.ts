import {entry} from './entry'
import {devServer} from './devServer'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins'

import type {Bud} from './types'
import type {WebpackConfig} from '@roots/bud-typings'

type WebpackBuilder = (bud: Bud) => WebpackConfig
type WebpackReducer = (
  acc: any,
  curr: WebpackBuilder,
) => WebpackConfig

const builders = [
  devServer,
  entry,
  general,
  rules,
  externals,
  output,
  optimization,
  plugins,
  webpackResolve,
]

const config: WebpackBuilder = bud => ({
  bud,

  reducer: (acc, curr) => ({
    ...(acc ?? {}),
    ...curr(bud),
  }),

  build: function () {
    return builders.reduce(
      (acc, curr) => ({
        ...(acc ?? {}),
        ...curr(this.bud),
      }),
      {},
    )
  },
})

export {
  config,
  builders,
  WebpackBuilder,
  WebpackReducer,
  WebpackConfig,
}
