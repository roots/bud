import type {
  Bud,
  Build,
  Container,
  Index,
  Rule,
  Item,
  Loader,
  Webpack,
  When,
} from '.'

export interface Contract<T = any> {
  options?: T

  register?: (bud: Bud.Bud) => void

  boot?: (bud: Bud.Bud) => void

  api?: (bud: Bud.Bud) => {[key: string]: CallableFunction}

  registerLoader?: RegisterOne<Loader>

  registerLoaders?: RegisterMany<Loader>

  registerRule?: RegisterOne<Rule.Module>

  registerRules?: RegisterMany<Rule.Module>

  registerItem?: RegisterOne<Item.Module>

  registerItems?: RegisterMany<Item.Module>

  make?: Make

  when?: When
}

export declare class Controller<T = unknown> extends Container {
  bud: Bud.Ref

  module?: Contract

  initialize?: () => Contract

  callMeMaybe?: (value: unknown, args: unknown[]) => unknown

  fromProp?: (prop: string, dep?: any) => [string, unknown]

  hasModuleProp?: (name: string) => boolean

  setApi?: () => void

  makePlugin?: () => Webpack.Plugin

  setOptions?: (options: Index<T>) => void

  getOptions?: () => Container<T>

  setBuilders?: (builders: [string, CallableFunction][]) => void
}

export type Register = (bud: Bud.Bud) => void

export type RegisterOne<T> =
  | ((bud?: Bud.Bud) => [string, T])
  | [string, T]

export type RegisterMany<T> =
  | ((bud?: Bud.Bud) => {[key: string]: T})
  | {[key: string]: T}

export type RawOptions<T = any> = T | ((bud?: Bud.Bud) => T)
export type Options<T = any> = Container<RawOptions<T>>

export type Make<P = unknown, T = Options> =
  | ((options: Container<T>) => P)
  | P

export type {When} from '.'

export type Boot = (bud: Bud.Bud) => void
