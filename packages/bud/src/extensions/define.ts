import {DefinePlugin as Plugin} from 'webpack'
import type {Extension} from '@roots/bud-extensions'

export const make: Make = opt => new Plugin(opt.all())

export const when: When = (_bud, opts) =>
  opts.entries()?.length > 0

export const options: RawOptions = bud =>
  bud.env
    .entries()
    .filter(([k]: [string, unknown]) => !k.includes('SECRET'))
    .reduce((a, [k, v]) => ({...a, [k]: v}), {})

declare type Make = Extension.Make<Plugin, Options>
declare type When = Extension.When<Options>
declare type Options = Extension.Options<RawOptions>
declare type RawOptions = Extension.RawOptions<{
  [key: string]: Plugin.CodeValueObject
}>
