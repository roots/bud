import type {
  Bud,
  Build,
  Container,
  Index,
  Rule,
  Item,
  Webpack,
  When,
} from '.'

/**
 * Extension
 */
export interface Contract {
  options?: {[key: string]: any}

  register?: (bud: Bud.Contract) => void

  boot?: (bud: Bud.Contract) => void

  api?: (bud: Bud.Contract) => {[key: string]: CallableFunction}

  registerLoader?: RegisterOne<Build.Loader>

  registerLoaders?: RegisterMany<Build.Loader>

  registerRule?: RegisterOne<Rule.Module>

  registerRules?: RegisterMany<Rule.Module>

  registerItem?: RegisterOne<Item.Module>

  registerItems?: RegisterMany<Item.Module>

  make?: Make

  when?: When
}

export declare class Controller extends Container {
  bud: Bud.Contract

  module?: Contract

  initialize?: () => Contract

  callMeMaybe?: (value: unknown, args: unknown[]) => unknown

  fromProp?: (prop: string, dep?: any) => [string, unknown]

  hasModuleProp?: (name: string) => boolean

  setApi?: () => void

  makePlugin?: () => Webpack.Plugin

  setOptions?: (options: Index<any>) => void

  getOptions?: () => Index<any>

  setBuilders?: (builders: [string, CallableFunction][]) => void
}

export type Register = (bud: Bud.Contract) => void

export type RegisterOne<T> =
  | ((bud?: Bud.Contract) => [string, T])
  | [string, T]

export type RegisterMany<T> =
  | ((bud?: Bud.Contract) => {[key: string]: T})
  | {[key: string]: T}

/**
 * Raw Extension options
 */
export type Options<T = any> = T | ((bud?: Bud.Contract) => T)

/**
 * Possible extension products
 */
export type Product = Webpack.Plugin

/**
 * Plugin make
 */
export type Make<P = unknown, T = Options> =
  | ((options: T) => P)
  | P

export type {When} from '.'

/**
 * Do stuff after registration
 */
export type Boot = (bud: Bud.Contract) => void
