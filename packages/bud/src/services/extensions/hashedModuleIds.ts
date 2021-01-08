import type {Module} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

export const options: Module.Options<{
  hashFunction?: string
  hashDigest?: string
  hashDigestLength?: number
}> = {
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
}

export const make: Module.Make<
  HashedModuleIdsPlugin,
  {
    hashFunction?: string
    hashDigest?: string
    hashDigestLength?: number
  }
> = opt =>
  new HashedModuleIdsPlugin({
    ...opt.all(),
  })

export const when: Module.When = bud =>
  bud.store.enabled('features.hash') && bud.mode.is('production')
