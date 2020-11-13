import {HotModuleReplacementPlugin} from 'webpack'
import type {Extension} from '@roots/bud-extensions'

export const make: Extension.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Extension.When = ({mode}) =>
  mode.is('development')
