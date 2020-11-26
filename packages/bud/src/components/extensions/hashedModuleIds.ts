import type {Bud, Extension} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

export const options: Extension.RawOptions = {
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
}

export const make: Extension.Make<
  Extension.RawOptions,
  HashedModuleIdsPlugin
> = (opt, {config}: Bud.Bud) =>
  new HashedModuleIdsPlugin({
    ...opt.all(),
    context: config.get('context'),
  })

export const when: Extension.When = ({features}) =>
  features.enabled('hash')
