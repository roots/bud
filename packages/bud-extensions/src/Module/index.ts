import type {
  Bud,
  Container,
  Rule,
  Item,
  Loader,
} from '@roots/bud-typings'

declare interface Module {
  options?: Module.RawOptions

  register?: Module.Register

  boot?: Module.Boot

  api?: Module.Api

  registerLoader?: Module.RegisterOne<Loader>

  registerLoaders?: Module.RegisterMany<Loader>

  registerRule?: Module.RegisterOne<Rule.Module>

  registerRules?: Module.RegisterMany<Rule.Module>

  registerItem?: Module.RegisterOne<Item.Module>

  registerItems?: Module.RegisterMany<Item.Module>

  make?: Module.Make

  when?: Module.When
}

declare namespace Module {
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

  export type Options = {[key: string]: any}

  export type Make<P = unknown, T = Options> =
    | ((options: Container<T>, bud?: Bud) => P)
    | P

  export type When = (bud: Bud, opt?: Container) => boolean

  export type Boot = (bud: Bud) => void
}

export {Module}
