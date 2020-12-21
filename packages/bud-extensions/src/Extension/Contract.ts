import Module from '../Module'
import {
  Framework,
  Container,
  Index,
  MaybeCallable,
} from '@roots/bud-typings'

interface Extension {
  readonly app: Framework

  initialized: boolean

  module: Module

  init(): void

  callMeMaybe(
    value: CallableFunction | any,
    ...args: unknown[]
  ): unknown

  fromProp(prop: string, dep?: unknown[]): [string, unknown]

  makePlugin(): MaybeCallable<any> | boolean

  isPlugin(): boolean

  isPluginEnabled(): boolean

  setOptions(options: Index<any>): void

  getOptions(): Container

  setBuilders(builders: [string, CallableFunction][]): void
}

export default Extension
