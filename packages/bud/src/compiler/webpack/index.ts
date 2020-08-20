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

const builders = [
  devServer,
  entry,
  general,
  rules,
  externals,
  output,
  plugins,
  webpackResolve,
]

const build = (bud: Bud): any => {
  const config: any = {}

  builders.forEach(builder => {
    Object.assign(config, builder(bud))
  })

  bud.features.enabled('optimize') && Object.assign(config, optimization(bud).make())

  return config
}

export {build}
