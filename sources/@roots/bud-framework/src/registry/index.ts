import { Configuration } from 'webpack'
import {Build} from './build'
import {Dev} from './dev'
import {Events} from './events'
import {Modules, Options} from './extensions'
import {Flags} from './flags'
import {Locations} from './locations'
import {Patterns} from './patterns'
import {Values} from './values'

export type StoreMap<T, N> = {
  [K in keyof T as `${N & string}.${K & string}`]: Array<
    T[K] | ((current?: T[K]) => T[K])
  >
}

export type ValueMap<T, N> = {
  [K in keyof T as `${N & string}.${K & string}`]: T[K]
}

export interface RegistryValue
  extends ValueMap<Build, 'build'>,
    ValueMap<Dev, 'dev'>,
    ValueMap<Events, 'event'>,
    ValueMap<Locations, 'location'>,
    ValueMap<Modules, 'extensions'>,
    ValueMap<Options, 'extensions'>,
    ValueMap<Flags, 'feature'>,
    ValueMap<Patterns, 'pattern'>,
    ValueMap<Values, 'value'> {
  build: Promise<Configuration>
}

export interface RegistryStore
  extends StoreMap<Build, 'build'>,
    StoreMap<Dev, 'dev'>,
    StoreMap<Events, 'event'>,
    StoreMap<Locations, 'location'>,
    StoreMap<Modules, 'extensions'>,
    StoreMap<Options, 'extensions'>,
    StoreMap<Flags, 'feature'>,
    StoreMap<Patterns, 'pattern'>,
    StoreMap<Values, 'value'> {
  build: Array<Promise<Configuration>>
}

/**
 * Async
 *
 * @public
 */
export interface AsyncMap {
  'build': RegistryValue['build']
  'build.entry': RegistryValue['build.entry']
  'build.plugins': RegistryValue['build.plugins']
  'build.resolve': RegistryValue['build.resolve']
  'build.resolve.alias': RegistryValue['build.resolve.alias']
  'build.resolve.modules': RegistryValue['build.resolve.modules']
}
export type AsyncRecord = {
  [K in keyof AsyncMap & keyof RegistryStore as `${K & string}`]: (current?: RegistryValue[K]) => Promise<RegistryValue[K]>
}
export type AsyncStore = {
  [K in keyof AsyncRecord & keyof RegistryStore as `${K & string}`]: Array<AsyncRecord[K]>
}

/**
 * Sync map
 *
 * @public
 */
export interface SyncValue
  extends Exclude<RegistryValue, keyof AsyncMap> {}

export type SyncStore = {
  [K in keyof SyncValue as `${K & string}`]: Array<
    (current?: SyncValue[K]) => SyncValue[K]
  >
}

export {
  Build,
  Dev,
  Events,
  Flags,
  Locations,
  Modules,
  Patterns,
  Options as ExtensionOptions,
  Values,
}
