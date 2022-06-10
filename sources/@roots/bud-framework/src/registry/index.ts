import {Bud} from '../bud.js'
import * as Build from './build.js'
import {Dev} from './dev.js'
import {Events} from './events.js'
import {Flags} from './flags.js'
import {Locations} from './locations.js'
import {Modules} from './modules.js'
import {Patterns} from './patterns.js'
import {Values} from './values.js'

export interface Registry
  extends Registry.Sync,
    Registry.Async,
    Registry.Events {}

export namespace Registry {
  export interface Sync
    extends Build.Sync,
      Dev,
      Flags.HookMap,
      Locations.HookMap,
      Patterns.HookMap,
      Values {}

  export type Async = Build.Async

  export type Events = Events.HookMap
}

export interface Store
  extends Store.SyncCallbackMap,
    Store.AsyncCallbackMap,
    Store.EventsCallbackMap {}

export namespace Store {
  export type SyncCallbackMap = {
    [K in keyof Registry.Sync as `${K & string}`]: Array<
      (current?: Registry.Sync[K]) => Registry.Sync[K]
    >
  }
  export type AsyncCallbackMap = {
    [K in keyof Registry.Async as `${K & string}`]: Array<
      (current?: Registry.Async[K]) => Promise<Registry.Async[K]>
    >
  }
  export type EventsCallbackMap = {
    [K in keyof Registry.Events as `${K & string}`]: Array<
      (app: Bud) => Promise<unknown>
    >
  }
}

export {Build, Dev, Flags, Locations, Modules, Patterns, Values}
