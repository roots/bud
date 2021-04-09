import {GlobTask, Instance} from '../../bud-support/src'

import {
  Constructor,
  Factory,
  Fluent,
  Index,
  MaybeCallable,
  MappedType,
} from './utility'

import {Build} from './Build'
import {Cache} from './Cache'
import {CLI} from './CLI'
import {Container} from '../../container/src'
import {Discovery} from './Discovery'
import {Dependencies} from './Dependencies'
import {Env} from './Env'
import {Hooks} from './Hooks'
import {Logger} from './Logger'
import {Bootstrapper, Service, Services} from './Service'
import {Store} from './Store'
import {Server} from './Server'
import {Extensions, Extension, Module} from './Extensions'

declare interface Framework {}

declare namespace Framework {
  export {Build}
  export {Bootstrapper}
  export {Cache}
  export {CLI}
  export {Container}
  export {Discovery}
  export {Dependencies}
  export {Disk}
  export {Env}
  export {Extensions, Extension}
  export {Error}
  export {FileContainer} from '../../filesystem/src'
  export {Hooks}
  export {Logger}
  export {Module}
  export {Server}
  export {Service}
  export {Services}
  export {Store}
  export {
    Express,
    Factory,
    Fluent,
    Index,
    MaybeCallable,
    Webpack,
  }
}

export {Api}
export {Build}
export {Bootstrapper}
export {Cache}
export {CLI}
export {Container}
export {Discovery}
export {Dependencies}
export {Disk}
export {Env}
export {Extensions, Extension}
export {Error}
export {FileContainer} from '../../filesystem/src'
export {Hooks}
export {Logger}
export {Module}
export {Server}
export {Service}
export {Services}
export {Store}
export {Express, Factory, Fluent, Index, MaybeCallable, Webpack}
