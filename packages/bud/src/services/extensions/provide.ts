import {ProvidePlugin as Plugin} from 'webpack'
import type {Index, Module} from '@roots/bud-typings'

export const make: Module.Make<
  Plugin,
  Index<{[key: string]: any}>
> = options => new Plugin(options.all())

export const when: Module.When = (_bud, options) =>
  options.getKeys().length > 0
