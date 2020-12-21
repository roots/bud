import type {Framework, Module} from '@roots/bud-typings'
import {HashedModuleIdsPlugin} from 'webpack'

export const options: Module.RawOptions = {
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20,
}

export const make: Module.Make<
  Module.RawOptions,
  HashedModuleIdsPlugin
> = (opt, {config}: Framework) =>
  new HashedModuleIdsPlugin({
    ...opt.all(),
    context: config.get('context'),
  })

export const when: Module.When = ({features}) =>
  features.enabled('hash')
