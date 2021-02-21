import {HotModuleReplacementPlugin} from 'webpack'
import type {Module} from '@roots/bud-typings'

export const name = `webpack-hot-module-replacement-plugin`

export const make: Module.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Module.When = bud => bud.isDevelopment
