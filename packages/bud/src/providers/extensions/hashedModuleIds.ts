import type {Module} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

declare interface Options {
  hashFunction?: string
  hashDigest?: string
  hashDigestLength?: number
}

export const options: Options = {
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
}

export const make: Module.Make<
  HashedModuleIdsPlugin,
  Options
> = options =>
  new HashedModuleIdsPlugin({
    ...options.all(),
  })

export const when: Module.When = bud =>
  bud.options.enabled('hash') && bud.isProduction
