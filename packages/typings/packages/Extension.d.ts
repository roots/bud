import type {
  Bud,
  Container,
  Index,
  Rule,
  Item,
  Loader,
  Webpack,
} from '.'

export interface Contract<T = any> {
  options?: T

  register?: (bud: Bud) => void

  boot?: (bud: Bud) => void

  api?: Api

  registerLoader?: RegisterOne<Loader>

  registerLoaders?: RegisterMany<Loader>

  registerRule?: RegisterOne<Rule.Module>

  registerRules?: RegisterMany<Rule.Module>

  registerItem?: RegisterOne<Item.Module>

  registerItems?: RegisterMany<Item.Module>

  make?: Make

  when?: When
}

export declare class Controller extends Container {
  bud: Bud.Ref

  module?: Contract

  initialize?: () => Contract

  callMeMaybe?: (value: unknown, args: unknown[]) => unknown

  fromProp?: (prop: string, dep?: any) => [string, unknown]

  hasModuleProp?: (name: string) => boolean

  setApi?: () => void

  makePlugin?: () => Webpack.Plugin

  setOptions?: (options: Index<any>) => void

  getOptions?: () => Container

  setBuilders?: (builders: [string, CallableFunction][]) => void
}

export type Api =
  | {[key: string]: CallableFunction}
  | ((bud?: Bud) => {[key: string]: CallableFunction})

export type Register = (bud: Bud) => void

export type RegisterOne<T> =
  | ((bud?: Bud) => [string, T])
  | [string, T]

export type RegisterMany<T> =
  | ((bud?: Bud) => {[key: string]: T})
  | {[key: string]: T}

export type RawOptions<T = any> = T | ((bud?: Bud) => T)
export type Options<T = any> = Container<T>

export type Make<P = unknown, T = Options> =
  | ((options: Container<T>, bud?: Bud) => P)
  | P

export type When = (bud: Bud, opt?: Container) => boolean

export type Boot = (bud: Bud) => void
