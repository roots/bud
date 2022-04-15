import * as Build from './build'
import {Dev} from './dev'
import {Events} from './events'
import {Flags} from './flags'
import {Locations} from './locations'
import {Modules} from './modules'
import {Patterns} from './patterns'
import {Values} from './values'

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

export type Store = {
  [K in keyof Registry as `${K & string}`]: Array<
    | ((current?: Registry[K]) => Registry[K])
    | ((current?: Registry[K]) => Promise<Registry[K]>)
  >
}

export {Build, Dev, Flags, Locations, Modules, Patterns, Values}
