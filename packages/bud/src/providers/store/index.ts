import {Framework, Store} from '@roots/bud-typings'
import * as args from './args'
import * as webpack from './webpack'
import * as patterns from './patterns'
import * as server from './server'
import {get} from '@roots/bud-support'
import {Service} from '@roots/bud-framework'

const presets = {}

export default class extends Service implements Store {
  public get<T = any>(key: Store.Keys): T {
    return get(this.repository, key)
  }
}

export const repositories: Framework.Index<any> = {
  ...args,
  webpack,
  patterns,
  presets,
  server,
}
