import {ProvidePlugin as Plugin} from 'webpack'
import type {Index, Module} from '@roots/bud-typings'

export const make: Module.Make<Plugin, Index<any>> = opt =>
  new Plugin(opt.getStore())

export const when: Module.When = (_, opt) =>
  opt.getEntries().length > 0
