import {DefinePlugin} from 'webpack'
import type {Module} from '@roots/bud-typings'

export const name = `webpack-define-plugin`

export const make: Module.Make<
  DefinePlugin,
  PluginOptions
> = options => new DefinePlugin(options.all())

export const when: Module.When = (_bud, opts) =>
  opts.getEntries()?.length > 0

export const options: Module.Options<PluginOptions> = bud =>
  bud.env
    .getEntries()
    .filter(([k]: [string]) => !k.includes('SECRET'))
    .reduce((a, [k, v]) => ({...a, [k]: JSON.stringify(v)}), {})

export interface PluginOptions {
  definitions: {
    [key: string]: DefinePlugin.CodeValueObject
  }
}
