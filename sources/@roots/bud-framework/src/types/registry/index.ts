import type Value from '../../value.js'
import type * as Build from './build.js'
import type * as Dev from './dev.js'
import type {Events} from './events.js'
import type * as Flags from './flags.js'
import type * as Locations from './locations.js'
import type * as Modules from './modules.js'
import type * as Patterns from './patterns.js'
import type * as Values from './values.js'

interface SyncRegistry
  extends Build.SyncRegistry,
    Dev.SyncRegistry,
    Flags.SyncRegistry,
    Locations.Registry,
    Patterns.SyncRegistry,
    Values.SyncRegistry {}

type SyncCallback = {
  [K in keyof SyncRegistry]?:
    | ((current?: SyncRegistry[K] | undefined) => SyncRegistry[K])
    | SyncRegistry[K]
}

type SyncStore = {
  [K in keyof SyncRegistry as `${K & string}`]?: Array<
    Value<
      | ((current?: SyncRegistry[K] | undefined) => SyncRegistry[K])
      | SyncRegistry[K]
    >
  >
}

type Async = Build.Async

type AsyncRegistry = {
  [K in keyof Build.AsyncRegistry as `${K &
    string}`]?: Build.AsyncRegistry[K]
}

type AsyncCallback = {
  [K in keyof Build.AsyncRegistry as `${K & string}`]?:
    | ((
        current?: Build.AsyncRegistry[K] | undefined,
      ) => Promise<Build.AsyncRegistry[K]>)
    | Build.AsyncRegistry[K]
}

type AsyncStore = {
  [K in keyof AsyncRegistry as `${K & string}`]?: Array<
    Value<
      | ((
          current?: AsyncRegistry[K] | undefined,
        ) => Promise<AsyncRegistry[K]>)
      | AsyncRegistry[K]
    >
  >
}

type EventsCallback<T extends keyof Events> = (
  value: Events[T],
) => Promise<unknown>

type EventsStore = {
  [K in keyof Events as `${K & string}`]: Array<EventsCallback<K>>
}

type Store = SyncStore & AsyncStore & EventsStore

export type {
  Async,
  AsyncCallback,
  AsyncRegistry,
  AsyncStore,
  Build,
  Dev,
  Events,
  EventsCallback,
  EventsStore,
  Flags,
  Locations,
  Modules,
  Patterns,
  Store,
  SyncCallback,
  SyncRegistry,
  SyncStore,
  Values,
}
