import {
  Api,
  Build,
  Bootstrapper,
  Cache,
  Dashboard,
  CLI,
  Compiler,
  Constructor,
  Container,
  Dependencies,
  Discovery,
  Env,
  Express,
  Extensions,
  Extension,
  Factory,
  Disk,
  Fluent,
  GlobTask,
  Module,
  Hooks,
  Index,
  Item,
  Loader,
  Logger,
  MaybeCallable,
  Services,
  Rule,
  Server,
  Service,
  Store,
  Webpack,
} from './'

/**
 * # Bud Framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/framework](#)
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 */
export declare interface Framework extends Mode {
  name: string

  build: Build

  cache: Cache

  cli: CLI

  compiler: Compiler

  dashboard: Dashboard

  dependencies: Dependencies

  discovery: Discovery

  disk: Disk

  env: Env

  extensions: Extensions

  hooks: Hooks

  logger: Logger

  server: Server

  services: Container

  store: Store

  services: Container

  when: When

  mode: 'development' | 'production'

  isProduction: boolean

  isDevelopment: boolean

  get<I = any>(service?: string | number): I

  container(repository?: any): Container

  pipe<V = any, R = any>(fns: CallableFunction[], value: V): R

  topics(topics: string[], caller?: string)

  subscribe<T = any>(name: string, caller?: string): T

  publish<T = any>(pubs: {[key: string]: any}, caller?: string)

  when(
    test: ((app: Framework) => boolean) | boolean,
    isTrue: (app: Framework) => any,
    isFalse?: (app: Framework) => any,
  ): Framework
}

export declare namespace Framework {
  export {Api}
  export {Build}
  export {Bootstrapper}
  export {Cache}
  export {Dashboard}
  export {CLI}
  export {Compiler}
  export {Container}
  export {Discovery}
  export {Dependencies}
  export {Disk}
  export {Env}
  export {Extensions, Extension}
  export {Item}
  export {Module}
  export {Hooks}
  export {Loader}
  export {Logger}
  export {Services}
  export {Rule}
  export {Server}
  export {Service}
  export {ServiceKeys}
  export {Store}
  export {
    Constructor,
    Express,
    Factory,
    Fluent,
    GlobTask,
    Index,
    MaybeCallable,
    Webpack,
  }
}
