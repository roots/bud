import type {
  Framework,
  Container,
  Rule,
  Item,
  Loader,
} from '@roots/bud-typings'

interface Module {
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

namespace Module {
  export type Api =
    | {[key: string]: CallableFunction}
    | ((bud?: Framework) => {[key: string]: CallableFunction})

  export type Register = (bud: Framework) => void

  export type RegisterOne<T> =
    | ((bud?: Framework) => [string, T])
    | [string, T]

  export type RegisterMany<T> =
    | ((bud?: Framework) => {[key: string]: T})
    | {[key: string]: T}

  export type RawOptions<T = any> = T | ((bud?: Framework) => T)

  export type Options = {[key: string]: any}

  export type Make<P = unknown, T = Options> =
    | ((options: Container<T>, bud?: Framework) => P)
    | P

  export type When = (bud: Framework, opt?: Container) => boolean

  export type Boot = (bud: Framework) => void
}

export default Module
