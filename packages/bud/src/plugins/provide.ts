import {ProvidePlugin as Plugin} from 'webpack'
import type {Extension} from '@roots/bud-extensions'

export const make: Make = opt => new Plugin(opt.all())
export const when: When = (_, opt) => opt?.has('definitions')
export const options: RawOptions = {}

declare type Make = Extension.Make<Plugin, Options>
declare type When = Extension.When<Options>
declare type Options = Extension.Options<RawOptions>
declare type RawOptions = Extension.RawOptions<{
  definitions?: {[key: string]: unknown}
}>
