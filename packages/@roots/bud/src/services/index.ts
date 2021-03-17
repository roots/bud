import {Providers} from '@roots/bud-typings'

import {Service} from '@roots/bud-framework'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dashboard} from '@roots/bud-dashboard'
import {Extensions} from '@roots/bud-extensions'

import {Build} from './Build'
import {Dependencies} from './Dependencies'
import {Discovery} from './Discovery'
import {Disk} from './Disk'
import {Env} from './Env'
import {Hooks} from './Hooks'
import {Server} from './Server'
import {Store} from './Store'

import {extensions} from '../extensions'

/**
 * Service providers
 */
export const providers: {
  [key: string]: [Providers.Constructor, Providers.Options?]
} = {
  hooks: [Hooks],
  store: [Store],
  env: [Env],
  fs: [Service],
  build: [Build],
  discovery: [Discovery],
  dependencies: [Dependencies],
  disk: [Disk],
  extensions: [Extensions, {containers: extensions}],
  cache: [Cache],
  server: [Server],
  dashboard: [Dashboard],
  compiler: [Compiler],
}
