import path from 'path'

import {
  Env,
  Options,
  Discovery,
  Disk,
  Logger,
} from '@roots/bud-framework'

import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Hooks, hooks} from '@roots/bud-hooks'
import {Dashboard} from '@roots/bud-cli'
import {Server} from '@roots/bud-server'
import {express} from '@roots/bud-support'
import {Providers} from '@roots/bud-typings'

import {Extensions} from '@roots/bud-extensions'
import {extensions} from './extensions'

import {Build} from '@roots/bud-build'
import Store, {repositories} from './store'
import {options} from './options'
import * as items from './items'
import * as rules from './rules'

export declare type Provider = [
  Providers.Constructor,
  Providers.Options?,
]

export declare interface Providers {
  [key: string]: Provider
}

/**
 * Default disks
 */
const disks = {
  ['@roots']: {
    baseDir: path.resolve(process.cwd(), 'node_modules/@roots'),
    glob: ['**/*', '*', '!**/node_modules', '*.map'],
  },
  ['project']: {
    baseDir: process.cwd(),
    glob: ['**/*', '*', '!vendor', '!node_modules'],
  },
}

/**
 * Service providers
 */
export const providers: Providers = {
  env: [Env],
  logger: [Logger],
  discovery: [Discovery],
  disk: [Disk, {containers: disks}],
  options: [Options, {containers: options}],
  hooks: [Hooks, {containers: hooks}],
  build: [Build, {containers: {items, rules}}],
  extensions: [Extensions, {containers: extensions}],
  cache: [Cache],
  cli: [Dashboard],
  compiler: [Compiler],
  server: [Server, {dependencies: {instance: express()}}],
  store: [Store, {containers: repositories}],
}
