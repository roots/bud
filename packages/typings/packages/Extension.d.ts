import type {
  Bud,
  Container,
  Rule,
  Index,
  Item,
  Loader,
} from '.'

export interface Contract<T = any> {
  options?: Index<any>

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

export type {Extension as Controller} from '../../bud-extensions/src/Extension'

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
