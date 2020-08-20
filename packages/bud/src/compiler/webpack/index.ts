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

const builders = [entry, rules, externals, devServer, webpackResolve]
const complexBuilders = [general, plugins, output]

const build = (bud: Bud): any => {
  const config: any = {}

  builders.forEach(builder => {
    Object.assign(config, builder(bud))
  })

  complexBuilders.map(builder => {
    Object.assign(config, builder(bud).make())
  })

  bud.features.enabled('optimize') && complexBuilders.push(optimization)

  return config
}

export {build}
