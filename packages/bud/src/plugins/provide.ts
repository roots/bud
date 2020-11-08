import {ProvidePlugin} from 'webpack'
import type {Extension} from '@roots/bud-typings'

export const options: Extension.Options = {}
export const make: Extension.Make = opts =>
  new ProvidePlugin(opts)
