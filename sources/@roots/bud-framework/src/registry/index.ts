import type {Bud} from '../bud.js'
import type * as Build from './build.js'
import type {Dev} from './dev.js'
import type {Events} from './events.js'
import type {Flags} from './flags.js'
import type {Locations} from './locations.js'
import type {Modules} from './modules.js'
import type {Patterns} from './patterns.js'
import type {Values} from './values.js'

export interface Registry
  extends Registry.Sync,
    Registry.Async,
    Registry.Events {}

export namespace Registry {
  export interface Sync
    extends Partial<Build.Sync>,
      Partial<Dev>,
      Partial<Flags.HookMap>,
      Partial<Locations.HookMap>,
      Partial<Patterns.HookMap>,
      Partial<Values> {}

  export type Async = Build.Async

  export type Events = Events.HookMap
}

export interface Store
  extends Partial<Store.SyncCallbackMap>,
    Partial<Store.AsyncCallbackMap>,
    Partial<Store.EventsCallbackMap> {}

export namespace Store {
  export type SyncCallbackMap = {
    [K in keyof Registry.Sync as `${K & string}`]: Array<
      (current?: Registry.Sync[K]) => Registry.Sync[K] | Registry.Sync[K]
    >
  }
  export type AsyncCallbackMap = {
    [K in keyof Registry.Async as `${K & string}`]: Array<
      (
        current?: Registry.Async[K],
      ) => Promise<Registry.Async[K]> | Registry.Async[K]
    >
  }
  export type EventsCallbackMap = {
    [K in keyof Registry.Events as `${K & string}`]: Array<
      (app: Bud) => Promise<unknown>
    >
  }
}

export type {Build, Dev, Flags, Locations, Modules, Patterns, Values}
