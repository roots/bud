import type {Bud, Extension} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

export const options: Extension.Module.RawOptions = {
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
}

export const make: Extension.Module.Make<
  Extension.Module.RawOptions,
  HashedModuleIdsPlugin
> = (opt, {config}: Bud) =>
  new HashedModuleIdsPlugin({
    ...opt.all(),
    context: config.get('context'),
  })

export const when: Extension.Module.When = ({features}) =>
  features.enabled('hash')
