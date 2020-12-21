import {DefinePlugin as Plugin} from 'webpack'
import type {Module} from '@roots/bud-typings'

export const make: Module.Make<Plugin, PluginOptions> = opt =>
  new Plugin(opt.getStore())

export const when: Module.When = (_bud, opts) =>
  opts.getEntries()?.length > 0

export const options: Module.RawOptions<PluginOptions> = bud =>
  bud.env
    .getEntries()
    .filter(([k]: [string, unknown]) => !k.includes('SECRET'))
    .reduce((a, [k, v]) => ({...a, [k]: v}), {})

export type PluginOptions = {
  [key: string]: Plugin.CodeValueObject
}
