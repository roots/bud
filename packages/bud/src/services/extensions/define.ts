import {DefinePlugin} from 'webpack'
import type {Module} from '@roots/bud-typings'

export const make: Module.Make<
  DefinePlugin,
  PluginOptions
> = options => new DefinePlugin(options.all())

export const when: Module.When = (_bud, opts) =>
  opts.getEntries()?.length > 0

export const options: Module.Options<PluginOptions> = bud =>
  bud.env
    .getEntries()
    .filter(([k]: [string, unknown]) => !k.includes('SECRET'))
    .reduce((a, [k, v]) => ({...a, [k]: v}), {})

export type PluginOptions = {
  [key: string]: DefinePlugin['definitions']
}
