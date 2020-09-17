import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins'

import type {BudInterface} from '../'
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

type WebpackBuilder = (bud: BudInterface) => WebpackConfig

const config: WebpackBuilder = bud => {
  process.env.NODE_ENV = bud.mode.get() ?? 'none'
  process.env.BABEL_ENV = bud.mode.get() ?? 'none'

  return builders.reduce(
    (acc, curr: (bud: BudInterface) => WebpackConfig) => ({
      ...acc,
      ...curr(bud),
    }),
    {},
  )
}

export {config, builders, WebpackBuilder, WebpackConfig}
