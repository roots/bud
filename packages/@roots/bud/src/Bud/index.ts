import '@roots/bud-api'
import type {
  Build,
  Cache,
  Container,
  Compiler,
  Dashboard,
  Discovery,
  Disk,
  Env,
  Extension,
  Extensions,
  Item,
  Module,
  Hooks,
  Logger,
  Loader,
  Options,
  Providers,
  Rule,
  Server,
  Service,
  Store,
  Constructor,
  Express,
  Factory,
  Fluent,
  GlobTask,
  Index,
  MaybeCallable,
  Webpack,
} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'

/**
 * ## Bud
 *
 * A webpack framework combining the best parts of
 * Laravel Mix and Symfony Encore.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [📦 @roots/bud](https://github.io/roots/bud)
 */
class Bud extends Framework<Bud> {}

declare namespace Bud {
  export {
    Build,
    Cache,
    Container,
    Compiler,
    Dashboard,
    Discovery,
    Disk,
    Env,
    Extension,
    Extensions,
    Item,
    Module,
    Hooks,
    Logger,
    Loader,
    Options,
    Providers,
    Rule,
    Server,
    Service,
    Store,
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

export {Bud}
