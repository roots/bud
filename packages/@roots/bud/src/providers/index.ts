import path from 'path'
import {Providers} from '@roots/bud-typings'
import {
  Env,
  FS,
  Discovery,
  Disk,
  Logger,
} from '@roots/bud-framework'
import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Hooks, hooks} from '@roots/bud-hooks'
import {Dashboard} from '@roots/bud-dashboard'
import {Extensions} from '@roots/bud-extensions'
import {Server} from '@roots/bud-server'
import {express} from '@roots/bud-support'
import {extensions} from './extensions'

import Store, {repositories} from './store'
import * as items from './items'
import * as rules from './rules'
import * as initial from './source'

const params = repositories(initial)

/**
 * Service providers
 */
export const providers: {
  [key: string]: [Providers.Constructor, Providers.Options?]
} = {
  fs: [FS],
  env: [Env],
  logger: [Logger],
  discovery: [Discovery],
  disk: [
    Disk,
    {
      containers: {
        ['@roots']: {
          baseDir: path.resolve(
            params.locations.project,
            params.locations.modules,
            '@roots',
          ),
          glob: ['**/*', '*', '!**/node_modules', '*.map'],
        },
        ['project']: {
          baseDir: params.locations.project,
          glob: ['**/*', '*', '!vendor', '!node_modules'],
        },
      },
    },
  ],
  hooks: [Hooks, {containers: hooks}],
  build: [Build, {containers: {items, rules}}],
  extensions: [Extensions, {containers: extensions}],
  cache: [Cache],
  dashboard: [Dashboard],
  compiler: [Compiler],
  server: [Server, {dependencies: {instance: express()}}],
  store: [Store, {containers: params}],
}
