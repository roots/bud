import Module from '../Module'
import {
  Container,
  Framework,
  Index,
  Webpack,
} from '@roots/bud-typings'

interface Extension {
  bud: Framework

  initialized: boolean

  module: Module

  builders: [string, CallableFunction][]

  initialize: () => Module

  callMeMaybe: (
    value: CallableFunction | any,
    ...args: unknown[]
  ) => unknown

  fromProp: (prop: string, dep?: unknown[]) => [string, unknown]

  hasProp: (name: string) => boolean

  register: () => void

  boot: () => void

  makePlugin: () => Webpack.Plugin

  isPlugin: () => boolean

  isPluginEnabled: () => boolean

  setApi: () => void

  setOptions: (options: Index<any>) => void

  getOptions: () => Container

  setBuilders: (builders: [string, CallableFunction][]) => void
}

export default Extension
