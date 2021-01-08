import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Env, Mode, Disk} from '@roots/bud-framework'
import {Extensions} from '@roots/bud-extensions'
import {extensions} from './extensions'
import {Hooks, hooks} from '@roots/bud-hooks'
import {CLI} from '@roots/bud-cli'
import {Server} from '@roots/bud-server'

import {loaders} from './loaders'
import {items} from './items'
import * as rules from './rules'
import {containers} from './containers'
import type {Framework} from '@roots/bud-typings'

/**
 * Services
 */

export const services: Framework.Providers = [
  ['build', Build, {containers: {loaders, items, rules}}],
  ['cache', Cache, {}],
  ['cli', CLI, {}],
  ['compiler', Compiler, {}],
  ['disk', Disk, {containers}],
  ['env', Env, {}],
  ['extensions', Extensions, {extensions}],
  ['hooks', Hooks, hooks],
  ['mode', Mode, {}],
  ['server', Server, {}],
]
