import {ProvidePlugin as Plugin} from 'webpack'
import type {Index, Module} from '@roots/bud-typings'

export const name = `webpack-provide-plugin`

export const options = {}

export const make: Module.Make<
  Plugin,
  Index<{[key: string]: any}>
> = options => new Plugin(options.all())
