import {HotModuleReplacementPlugin} from 'webpack'
import type {Extension} from '@roots/bud-typings'

export const make: Extension.Module.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Extension.Module.When = ({mode}) =>
  mode.is('development')
