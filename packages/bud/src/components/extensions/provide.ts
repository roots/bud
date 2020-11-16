import {ProvidePlugin as Plugin} from 'webpack'
import type {Extension} from '@roots/bud-typings'

export const options: Options = {}

export const make: Extension.Make<Plugin> = opt =>
  new Plugin(opt.getStore())

export const when: Extension.When = (_, opt) =>
  opt.getEntries().length > 0

declare type Options = Extension.Options<{
  [key: string]: string
}>
