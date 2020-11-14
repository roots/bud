import {ProvidePlugin as Plugin} from 'webpack'
import type {Extension} from '@roots/bud-typings'

export const make: Extension.Make = opt => new Plugin(opt.all())

export const when: Extension.When = (_, opt) =>
  opt?.has('definitions')

export const options: Options = {}

declare type Options = Extension.Options<{
  definitions?: {[key: string]: unknown}
}>
