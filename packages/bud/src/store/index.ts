import {Framework} from '@roots/bud-typings'
import * as args from './args'
import * as webpack from './webpack'
import * as features from './features'
import * as patterns from './patterns'
import * as server from './server'

const presets = {}

export const store: Framework.Store.Source = {
  ...args,
  webpack,
  features,
  patterns,
  presets,
  server,
}
