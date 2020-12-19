import {ProvidePlugin as Plugin} from 'webpack'
import type {Index, Extension} from '@roots/bud-typings'

export const make: Extension.Module.Make<
  Plugin,
  Index<any>
> = opt => new Plugin(opt.getStore())

export const when: Extension.Module.When = (_, opt) =>
  opt.getEntries().length > 0
