import {Framework} from '@roots/bud-framework'
import type {Module} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

declare type Options = Module.Options<{
  hashFunction?: string
  hashDigest?: string
  hashDigestLength?: number
}>

export const name = 'hashed-module-ids-plugin'

export const options: Options = {
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
}

export const make: Module.Make<
  HashedModuleIdsPlugin,
  Options
> = options => new HashedModuleIdsPlugin(options.all())

export const when: Module.When = (app: Framework) =>
  app.store.isTrue('options.hash')
