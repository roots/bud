import type {Extension} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

export const options: Extension.RawOptions = bud => ({
  context: bud.src(),
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
})

export const make: Extension.Make<HashedModuleIdsPlugin> = opt =>
  new HashedModuleIdsPlugin(opt.all())

export const when: Extension.When = ({features}) =>
  features.enabled('hash')
