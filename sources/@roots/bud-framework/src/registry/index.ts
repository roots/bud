import type {Async, Sync as SyncHooks} from './build.js'
import type {Dev} from './dev.js'
import type {Events} from './events.js'
import type {Flags} from './flags.js'
import type {Locations} from './locations.js'
import type {Modules} from './modules.js'
import type {Patterns} from './patterns.js'
import type {Values} from './values.js'

export type Sync = SyncHooks &
  Dev &
  Flags &
  Locations.HookMap &
  Patterns.HookMap &
  Values

export type SyncCallback = {
  [K in keyof Sync as `${K & string}`]?:
    | ((current?: Sync[K]) => Sync[K])
    | Sync[K]
}

export type SyncStore = {
  [K in keyof Sync as `${K & string}`]?: Array<
    (current?: Sync[K]) => Sync[K]
  >
}

export type AsyncCallback = {
  [K in keyof Async as `${K & string}`]?:
    | ((current?: Async[K]) => Promise<Async[K]>)
    | Async[K]
}

export type AsyncStore = {
  [K in keyof Async as `${K & string}`]?: Array<
    (current?: Async[K]) => Promise<Async[K]>
  >
}

export type EventsCallback = {
  [K in keyof Events as `${K & string}`]?: Events[K]
}
export type EventsStore = {
  [K in keyof Events as `${K & string}`]?: Array<Events[K]>
}

export interface Store extends SyncStore, AsyncStore, EventsStore {}

export type {Async, Dev, Flags, Locations, Modules, Patterns, Values}
