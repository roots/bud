import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins'

import type {Bud} from '@roots/bud-types'
import type {WebpackConfig} from '@roots/bud-types'

const builders = [
  entry,
  general,
  rules,
  externals,
  output,
  optimization,
  plugins,
  webpackResolve,
]

type WebpackBuilder = (bud: Bud) => WebpackConfig

const config: WebpackBuilder = bud => {
  return builders.reduce(
    (acc: WebpackConfig, curr: (bud: Bud) => WebpackConfig) => ({
      ...(acc ?? []),
      ...curr(bud),
    }),
    {},
  )
}

export {config, builders, WebpackBuilder, WebpackConfig}
