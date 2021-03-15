import path from 'path'
import {Providers} from '@roots/bud-typings'
import {
  Env,
  Dependencies,
  Discovery,
  Disk,
  Logger,
  Store,
  Service,
} from '@roots/bud-framework'
import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Hooks} from '@roots/bud-hooks'
import {Dashboard} from '@roots/bud-dashboard'
import {Extensions} from '@roots/bud-extensions'
import {Server} from '@roots/bud-server'
import {express} from '@roots/bud-support'
import {extensions} from './extensions'

import {hooks} from './hooks'
import * as builders from './build'
import {repositories} from './store'

/**
 * Service providers
 */
export const providers: {
  [key: string]: [Providers.Constructor, Providers.Options?]
} = {
  store: [Store, {containers: repositories}],
  env: [Env, {containers: {env: repositories.env}}],
  logger: [Logger],
  fs: [Service],
  hooks: [Hooks, {dependencies: {register: hooks}}],
  build: [Build, {dependencies: {builders}}],
  discovery: [Discovery],
  dependencies: [Dependencies],
  disk: [
    Disk,
    {
      containers: {
        ['@roots']: {
          baseDir: path.resolve(
            repositories.locations.project,
            repositories.locations.modules,
            '@roots',
          ),
          glob: ['**/*', '*', '!node_modules', '*.map'],
        },
        ['project']: {
          baseDir: repositories.locations.project,
          glob: ['**/*', '*', '!node_modules', '!vendor'],
        },
      },
    },
  ],
  extensions: [Extensions, {containers: extensions}],
  cache: [Cache],
  dashboard: [Dashboard],
  compiler: [Compiler],
  server: [Server, {dependencies: {instance: express()}}],
}
